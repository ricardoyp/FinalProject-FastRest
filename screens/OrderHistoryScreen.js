import { Button, Text, View } from "tamagui";
import { getBillTicketsByEmail } from "../API";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const OrderHistoryScreen = () => {

    const { currentUser } = useContext(AuthContext);
    console.log(currentUser.email);

    return (
        <View>
            <Text>Order History Screen</Text>
            <Button onPress={() => getBillTicketsByEmail(currentUser.email)}>
                GetTickets
            </Button>
        </View>
    );
}