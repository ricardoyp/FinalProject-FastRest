import { FlatList } from "react-native";
import { Text, View } from "tamagui";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { CartItem } from "../components/CartItem";

export const ShoppingScreen = () => {
    const { cartItems } = useContext(CartContext);
    return (
        <View>
            <Text>Shopping Screen</Text>
            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                    <CartItem item={item} />
                )}
            />
        </View>
    );
};

