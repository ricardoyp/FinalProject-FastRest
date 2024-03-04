import React from 'react';
import { View, Text, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import { Button, Card, Separator } from 'tamagui';
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
        <View>
            <Text>TICKET</Text>
            <Text>Date: {ticket.date}</Text>
            <Text>Name: {ticket.name}</Text>
            <Text>Table: {ticket.table}</Text>
            <Text>Cart:</Text>
            {ticket.cart.map((item, index) => (
                <Card key={index}>
                    <Text>Plate: {item.name}</Text>
                    <Text>Price: {item.price}€</Text>
                    <Text>Quantity: {item.quantity}</Text>
                    <Text>Total: {item.price * item.quantity}€</Text>
                </Card>
            ))}
            <Text>TOTAL: {ticket.totalPrice}</Text>
            <Button icon={Share} title="Generate PDF" onPress={() => generatePDF(ticket)} />
        </View>
    );
}