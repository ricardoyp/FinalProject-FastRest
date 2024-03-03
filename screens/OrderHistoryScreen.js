import { Button, Text, View } from "tamagui";
import { getBillTicketsByEmail } from "../API";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import { Printer } from "@tamagui/lucide-icons";
import { Share } from "lucide-react-native";

export const OrderHistoryScreen = () => {
    const { currentUser } = useContext(AuthContext);

    const { data: billTickets, isLoading } = useQuery({
        queryKey: ['allBillTickets'],
        queryFn: () => getBillTicketsByEmail(currentUser.email)
    });


    
    let generatePDF = async (ticket) => {
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
            <p>Date: ${ticket.date}</p>
            <p>Name: ${ticket.name}</p>
            <p>Table: ${ticket.table}</p>
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
                    ${ticket.cart.map((item) => {
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
            <h3>TOTAL: ${ticket.totalPrice}</h3>
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
            <Text>Order History Screen</Text>
            {billTickets?.map((ticket) => {
                return (
                    <View key={ticket.date}>
                        <Text>{ticket.date}</Text>
                        <Text>{ticket.total}</Text>
                        <Button onPress={() => generatePDF(ticket)}>
                            <Share />
                        </Button>
                    </View>
                )
            })}
        </View>
    );
}

