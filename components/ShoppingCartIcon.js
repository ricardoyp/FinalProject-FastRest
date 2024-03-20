import { ShoppingCart } from "lucide-react-native";
import { Circle, Text, XStack } from "tamagui";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";

export const ShoppingCartIcon = ({ onPress }) => {
    const { numberOfItems } = useContext(CartContext)
    return (
        <XStack marginRight={'$2'}>
            <ShoppingCart onPress={onPress} />
            {numberOfItems === 0 ? null : (
            <Circle size={19} backgroundColor="$blue8Light" position="absolute" top={-5} right={-15}>
                <Text color={'white'} alignSelf="center" fontSize="$3" fontWeight='bold'>{numberOfItems}</Text>
            </Circle>
            )}
        </XStack>
    );
}
