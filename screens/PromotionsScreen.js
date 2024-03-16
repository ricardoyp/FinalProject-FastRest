import { View, Input, Button, ScrollView, Text } from "tamagui";
import { addPromotion, getPromotions } from "../API";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { PromotionItem } from "../components/PromotionItem";

export const PromotionsScreen = ({navigation}) => {
    const [code, setCode] = useState('');
    const { currentUser } = useContext(AuthContext);

    const { data: promotions, refetch } = useQuery({
        queryKey: ['myPromotions'],
        queryFn: () => getPromotions(currentUser.uid)
    });

    const handleAddPromotion = async () => {
        try {
            await addPromotion(code, currentUser.uid);
            refetch();
        } catch (error) {
            console.error('Error adding promotion:', error);
            alert(error.message);
        }
    }

    return (
        <View padding="$2">
            <View flexDirection="row">
                <Input placeholder="Enter promotional code..." flex={1} onChangeText={(text) => setCode(text)} />
                <Button onPress={handleAddPromotion}>Add</Button>
            </View>
            <ScrollView padding="$2">
                <View >
                    {promotions?.length > 0 ? (
                        promotions?.map((promotion, index) => {
                            return (
                                <PromotionItem key={index} promotion={promotion} navigation={navigation}/>
                            )
                        }
                        )
                    ) : (
                        <Text>No promotions available</Text>
                    )}
                </View>
            </ScrollView>
            <Button onPress={() => getPromotions(currentUser.uid)}>Use</Button>
        </View>
    );
}
