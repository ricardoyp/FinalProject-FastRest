import { useContext } from 'react';
import { Card, H2, Image, Paragraph, Button, XStack, Text } from 'tamagui';
import { CartContext } from '../context/CartContext';

export const MenuCard = ({ item }) => {

    const { addToCart } = useContext(CartContext);

    return (
        <Card key={item.id} elevate size="$2" bordered width={250}>
            <Card.Header padded>
                <H2>{item.name}</H2>
                <Paragraph theme="alt2">{item.description}</Paragraph>
            </Card.Header>
            <Card.Footer padded>
                <XStack flex={1} />
                <Button borderRadius="$10" onPress={() => {
                    addToCart(item);
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

