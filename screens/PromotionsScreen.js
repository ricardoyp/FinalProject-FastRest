import { View, Input, Button, ScrollView, Text } from "tamagui";
import { addPromotion } from "../API";
import { useState } from "react";

export const PromotionsScreen = () => {
    const [code, setCode] = useState('');

    const handleAddPromotion = async () => {
        try {
            await addPromotion(code);
        } catch (error) {
            console.error('Error adding promotion:', error);
            alert(error.message);
        }
    }

    return (
        <View>
            <View flexDirection="row">
                <Input placeholder="Enter promotional code..." flex={1} onChangeText={(text) => setCode(text)} />
                <Button onPress={handleAddPromotion}>Add</Button>
            </View>
            <ScrollView>
                <View>
                    <Text>🍔 2x1 in hamburgers</Text>
                    <Text>🍟 Free fries with your order</Text>
                    <Text>🍦 Free ice cream with your order</Text>
                </View>
            </ScrollView>
        </View>
    );
}
