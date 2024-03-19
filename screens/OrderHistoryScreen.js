import { ScrollView, Text, View, YStack } from "tamagui";
import { getBillTicketsByUid } from "../API";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { OrderItem } from "../components/OrderItem";
import { TouchableOpacity } from "react-native";


export const OrderHistoryScreen = ({navigation}) => {
    const { currentUser } = useContext(AuthContext);

    const { data: billTickets, isLoading } = useQuery({
        queryKey: ['allBillTickets'],
        queryFn: () => getBillTicketsByUid(currentUser.uid)
    });

    return (
        <View>
            <ScrollView>
                <YStack gap="3" padding="$2">
                {billTickets?.length > 0 ? (
                        billTickets.map((ticket, index) => (
                            console.log(ticket),
                            <TouchableOpacity onPress={() => navigation.navigate('Ticket', { ticket })} key={index}>
                                <OrderItem item={ticket} />
                            </TouchableOpacity>
                        ))
                    ) : (
                        <Text>No hay tickets disponibles</Text>
                    )}
                </YStack>
            </ScrollView>
        </View>
    );
}

