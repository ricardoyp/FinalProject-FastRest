import { Card, Text } from "tamagui"

export const OrderItem = ({ item }) => {

    return (
        <Card bordered>
            <Card.Header>
                <Text fontSize={"$7"} >{item.date}</Text>
                <Text theme="alt2">Price: {item.totalPrice}</Text>
            </Card.Header>
        </Card>
    )
}