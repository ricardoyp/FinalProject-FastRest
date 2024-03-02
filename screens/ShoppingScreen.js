import { Button, ScrollView, Text, View, YStack } from "tamagui";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { CartItem } from "../components/CartItem";

export const ShoppingScreen = () => {
    const { cartItems, confirmOrder, clearCart } = useContext(CartContext);
    const { tableNumber } = useContext(CartContext);

    console.log(cartItems);

    return (
        <View>
            <Text>Shopping Screen - Table {tableNumber}</Text>
            <ScrollView>
                <YStack gap="3">
                    {cartItems?.map((item, index) => (
                        item ?
                        <CartItem key={index} item={item} />
                        : null
                    ))}
                </YStack>
            </ScrollView>
            <Button onPress={() => confirmOrder(cartItems)}>Confirm Order</Button>
            <Button onPress={() => clearCart()}>Clear Cart</Button>
        </View>
    );
};

