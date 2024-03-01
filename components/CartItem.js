import { Button, Card, Group, ListItem, Text, View } from "tamagui";
import { Plus, Trash2 } from "@tamagui/lucide-icons";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export const CartItem = ({ item }) => {
    const { removeFromCart } = useContext(CartContext);
    return (
        <Card key={item.id} elevate size="$2" bordered width={250}>
            <Card.Header padded>
                <Text>{item.name}</Text>
                <Text theme="alt2">Quantity: {item.quantity}</Text>
            </Card.Header>
            <Card.Footer padded>
                <Text>{item.price * item.quantity}€</Text>
                <Group orientation="horizontal">
                    <Group.Item>
                        <Button onPress={() => {
                            removeFromCart(item);
                        }}>
                            <Trash2 />
                        </Button>
                    </Group.Item>
                    <Group.Item>
                        <Text>{item.quantity}</Text>
                    </Group.Item>
                    <Group.Item>
                        <Button>
                            <Plus />
                        </Button>
                    </Group.Item>
                </Group>
            </Card.Footer>
        </Card>
    )
}