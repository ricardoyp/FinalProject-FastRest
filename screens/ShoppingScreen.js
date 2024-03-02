import { Button, ScrollView, Text, View, YStack } from "tamagui";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { CartItem } from "../components/CartItem";

export const ShoppingScreen = () => {
    const { cartItems, confirmOrder, clearCart } = useContext(CartContext);
    return (
        <View>
            <Text>Shopping Screen</Text>
            <ScrollView>
                <YStack gap="3">
                    {cartItems?.map((item, index) => (
                        <CartItem key={index} item={item} />
                    ))}
                </YStack>
            </ScrollView>
            <Button onPress={() => confirmOrder(cartItems)}>Confirm Order</Button>
            <Button onPress={() => clearCart()}>Clear Cart</Button>
        </View>
    );
};

