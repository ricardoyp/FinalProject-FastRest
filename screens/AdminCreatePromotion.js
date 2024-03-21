import { useState } from "react";
import { Button, Input, Stack, Text, View } from "tamagui";
import { SelectComponent } from "../components/Select";
import { createPromotion } from "../API";

export const AdminCreatePromotion = ({ navigation }) => {
    const [code, setCode] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [minCart, setMinCart] = useState('');
    const [type, setType] = useState('');

    const handleCreatePromotion = async () => {
        if (!code || !amount || !description || !minCart || !type) {
            alert('Todos los campos son obligatorios');
            return;
        }
        const promotion = {
            code: code,
            amount: Number(amount),
            description: description,
            minCart: Number(minCart),
            used: false,
            type: type
        }   
        console.log('Create Promotion', promotion);
        createPromotion(promotion);
        navigation.goBack();
    }

    return (
        <View>
            <Stack gap={'$2'} padding="$4">
            <   Text fontSize={'$7'}>CREAR PROMOCION</Text>
                <Input placeholder='Code' value={code} onChangeText={(text) => setCode(text)} />
                <Input placeholder='Amount' value={amount} onChangeText={(text) => setAmount(text)} />
                <Input placeholder='Description' value={description} onChangeText={(text) => setDescription(text)} />
                <Input placeholder='Min Cart' value={minCart} onChangeText={(text) => setMinCart(text)} />
                <SelectComponent value={type} onValueChange={setType} items={[{name: 'percentage'}, {name: 'classic'}]} />
            </Stack>
            <Stack gap={'$3'}>
                <Button onPress={handleCreatePromotion}>Create Promotion</Button>
            </Stack>
        </View>
    );

}