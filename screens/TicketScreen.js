import React from 'react';
import { useRoute } from '@react-navigation/native';
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import { Button, Card, H2, H3, ScrollView, Stack, Text, View, XStack } from 'tamagui';
import { Share } from '@tamagui/lucide-icons';

export const TicketScreen = () => {
    const route = useRoute();
    const { ticket } = route.params;
    let generatePDF = async (tick) => {
        const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    font-family: monospace;
                    margin: 0 auto; /* Center the ticket on the page */
                    width: 400px; /* Increase width for better readability */
                    padding: 10px; /* Add some padding for a cleaner look */
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 5px;
                    text-align: left;
                }
                th {
                    background-color: #eee;
                }
                h3 {
                    text-align: right;
                    margin-top: 10px;
                }
            </style>
        </head>
        <body>
            <h1>TICKET</h1>
            <p>Date: ${tick.date}</p>
            <p>Name: ${tick.name}</p>
            <p>Table: ${tick.table}</p>
            <table>
                <thead>
                    <tr>
                        <th>Plate</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${tick.cart.map((item) => {
            return `
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.price}€</td>
                            <td>${item.quantity}</td>
                            <td>${item.price * item.quantity}€</td>
                        </tr>
                        `;
        }
        )}
                </tbody>
            </table>
            ${tick.promotion && `
            <h3>Discount: -${tick.promotion.amount}€</h3>
            `}
            <h3>TOTAL: ${tick.totalPrice}</h3>
        </body>
        </html>
        
        `;
        const file = await printToFileAsync({
            html: html,
            base64: false
        });
        await shareAsync(file.uri);
    }

    return (
        <View padding='$3' height={'100%'}>
            <Stack >
                <H2>Date: {ticket.date}</H2>
                <H3>Name: {ticket.name}</H3>
                <Text>Table: {ticket.table}</Text>
            </Stack>
            <ScrollView>
                <Stack gap='$2'>
                    {ticket.cart.map((itemTicket, index) => (
                        <Card key={index}>
                            <Card.Header>
                                <Text>Plate: {itemTicket.name}</Text>
                                <Text>Price: {itemTicket.price}€</Text>
                                <Text>Quantity: {itemTicket.quantity}</Text>
                            </Card.Header>
                            <Card.Footer padded>
                                <Text>Total: {itemTicket.price * itemTicket.quantity}€</Text>
                            </Card.Footer>
                        </Card>
                    ))}
                </Stack>
            </ScrollView>
            <Stack>
                <H3>TOTAL: {ticket.cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}€</H3>
                {ticket.promotion && <Text fontSize={"$6"}>Discount: -{ticket.promotion.amount}{ticket.promotion.type === 'percentage' ? "%" : "€"}</Text>}
                {ticket.promotion && <Text fontSize={"$6"}>Total to pay: {ticket.totalPrice}€</Text>}
                <Button icon={Share} title="Generate PDF" onPress={() => generatePDF(ticket)} />
            </Stack>
        </View>
    );
}