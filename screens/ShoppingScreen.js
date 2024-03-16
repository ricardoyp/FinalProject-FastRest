import { Button, ScrollView, Stack, Text, View, YStack } from "tamagui";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { CartItem } from "../components/CartItem";
import { Trash2 } from "lucide-react-native";

export const ShoppingScreen = () => {
    const { cartItems, totalPrice, confirmOrder, clearCart, promotionCart, setPromotion, tableNumber } = useContext(CartContext);

    return (
        <Stack padding={'$1'} flex={1}>
            <View gap="3" padding="$2">
                <Text fontSize={"$8"}> 🍽️ Table: {tableNumber ? tableNumber : "No Yet"}</Text>
                <View flexDirection="row" alignItems="center" style={{flexWrap: 'wrap'}}>
                    <Text fontSize={"$8"} flex={1}> 🎟️ Promotion: {promotionCart.code ? promotionCart.code : "No Yet"}</Text>
                    <Button icon={Trash2} onPress={() => setPromotion('')} />
                </View>
            </View>
            <ScrollView gap="3" padding="$2" >
                {cartItems?.map((item, index) => (
                    <CartItem key={index} item={item} />
                ))}
            </ScrollView>
            <YStack gap="3" padding="$2">
                <Text fontSize={"$8"}>Total: {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}€</Text>
                {promotionCart && <Text fontSize={"$6"}>Discount: {promotionCart.amount}{promotionCart.type === "percentage" ? "%" : "€"} </Text>}
                <Text fontSize={"$6"}>Total to pay: {totalPrice}€</Text>
                <Button onPress={() => confirmOrder(cartItems)}>Confirm Order</Button>
                <Button onPress={() => clearCart()}>Clear Cart</Button>
            </YStack>
        </Stack>
    );
};

