import { Card, H2, Image, Paragraph, Button, XStack } from 'tamagui';

const MenuCard = ({ item, type }) => {
    return (
        <Card key={item.id} elevate size="$2" bordered width={250}>
            <Card.Header padded>
                <H2>{item.name}</H2>
                <Paragraph theme="alt2">{item.description}</Paragraph>
            </Card.Header>
            <Card.Footer padded>
                <XStack flex={1} />
                <Button borderRadius="$10">Purchase</Button>
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

export default MenuCard;
