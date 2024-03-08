import { useContext } from 'react';
import { Card, Image, Paragraph, Button, XStack, Text, View, Stack } from 'tamagui';
import { CartContext } from '../context/CartContext';

export const MenuCard = ({ item }) => {

    const { addToCart } = useContext(CartContext);

    return (
        <Stack>
            <Card key={item.id} bordered width='100%' height={200} backgroundColor={'$black05'} borderRadius={30}>
                <Card.Header padded height={"50%"}>
                    <Text fontSize={'$8'} color='white'>{item.name}</Text>
                    <Paragraph color={'white'}>{item.description}</Paragraph>
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
                <Card.Background borderRadius={30}>
                    <Image source={{ uri: item.imageUrl }} width="auto" height="100%" resizeMode='cover' />
                    <View
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'black',
                            opacity: 0.6, // Adjust opacity for desired darkness
                        }}
                    />
                </Card.Background>
            </Card>
        </Stack>
    );
};
