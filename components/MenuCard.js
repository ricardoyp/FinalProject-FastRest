import { useContext } from 'react';
import { Card, H2, Image, Paragraph, Button, XStack, Text, View } from 'tamagui';
import { CartContext } from '../context/CartContext';
import { StyleSheet } from 'react-native';

export const MenuCard = ({ item }) => {

    const { addToCart } = useContext(CartContext);

    return (
        <Card key={item.id} elevate size="$2" bordered width={250} > 
            <Card.Header padded>
                <H2 color='white'>{item.name}</H2>
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
            <Card.Background >
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
    );
};
