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
            <Text fontSize={"$8"}> 🍽️ Table: {tableNumber ? tableNumber : "No Yet"}</Text>
            <View height={600}>
            <ScrollView>
                <YStack gap="3" padding="$2">
                    {cartItems?.map((item, index) => (
                        <CartItem key={index} item={item} />
                    ))}
                </YStack>
            </ScrollView>
            </View>
            <Text fontSize={"$8"}>Total: {cartItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0).toFixed(2)}€</Text>
            <Button onPress={() => confirmOrder(cartItems)}>Confirm Order</Button>
            <Button onPress={() => clearCart()}>Clear Cart</Button>
        </View>
    );
};

