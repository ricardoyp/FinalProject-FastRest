import { ScrollView, Text, View, YStack } from "tamagui";
import { getBillTicketsByEmail } from "../API";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { OrderItem } from "../components/OrderItem";
import { TouchableOpacity } from "react-native";


export const OrderHistoryScreen = ({navigation}) => {
    const { currentUser } = useContext(AuthContext);

    const { data: billTickets, isLoading } = useQuery({
        queryKey: ['allBillTickets'],
        queryFn: () => getBillTicketsByEmail(currentUser.email)
    });

    return (
        <View>
            <Text>Order History Screen</Text>
            <ScrollView>
                <YStack gap="3" padding="$2">
                    {billTickets?.map((ticket) => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate('Ticket', { ticket })}>
                                <OrderItem item={ticket} />
                            </TouchableOpacity>
                        )
                    })}
                </YStack>
            </ScrollView>
        </View>
    );
}

