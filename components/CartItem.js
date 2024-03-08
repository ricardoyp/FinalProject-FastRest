import { Button, Card, Group, Text } from "tamagui";
import { Plus, Trash2 } from "@tamagui/lucide-icons";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export const CartItem = ({ item }) => {
    const { removeFromCart, addToCart } = useContext(CartContext);
    return (
        <Card key={item.name} bordered>
            <Card.Header padded>
                <Text fontSize={"$7"} >{item.name}</Text>
                <Text theme="alt2">Price: {item.price * item.quantity}€</Text>
            </Card.Header>
            <Card.Footer padded alignSelf="flex-end">
            <Group orientation="horizontal" alignItems="center">
                    <Group.Item>
                        <Button icon={Trash2} onPress={() => { removeFromCart(item) }} />
                    </Group.Item>
                    <Group.Item>
                        <Button disabled>
                            <Text> {item.quantity} </Text>
                        </Button>
                    </Group.Item>
                    <Group.Item>
                        <Button icon={Plus} onPress={() => { addToCart(item) }} />
                    </Group.Item>
                </Group>
            </Card.Footer>
        </Card>
    )
}