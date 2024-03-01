import { useState } from 'react';
import { Card, H2, Image, Paragraph, Button, XStack, Text } from 'tamagui';

export const MenuCard = ({ item }) => {
    const [cart, setCart] = useState([]);

    return (
        <Card key={item.id} elevate size="$2" bordered width={250}>
            <Card.Header padded>
                <H2>{item.name}</H2>
                <Paragraph theme="alt2">{item.description}</Paragraph>
            </Card.Header>
            <Card.Footer padded>
                <XStack flex={1} />
                <Button borderRadius="$10" onPress={() => {
                    setCart([...cart, item]);
                    console.log(cart);
                }}>
                    <Text>
                        {item.price}€
                    </Text>
                </Button>
            </Card.Footer>
            <Card.Background>
                <Image
                    resizeMode="contain"
                    alignSelf="center"
                    source={item.image}
                />
            </Card.Background>
        </Card>
    );
};

