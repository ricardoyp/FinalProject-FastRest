import { useContext } from "react";
import { Button, Card, H3, Text } from "tamagui";
import { CartContext } from "../context/CartContext";

export const PromotionItem = ({ promotion, navigation }) => {
    const { promotionCart, setPromotion, totalPrice } = useContext(CartContext);

    const handleUsePromotion = () => {
        if (totalPrice >= promotion.minCart) {
            setPromotion(promotion);
            alert('Promotion code added')
            navigation.goBack();
            navigation.navigate('Shopping');
        } else {
            setPromotion('');
            alert('You need to have a minimum of ' + promotion.minCart + '€ in your cart to use this promotion');
        }
    }

    return (
        <Card bordered flexDirection="row" >
            <Card.Header flex={1}>
                <H3>{promotion.code}</H3>
                <Text>{promotion.description}</Text>
            </Card.Header>
            <Card.Footer padded >
                {promotion.used ?
                    <Button onPress={handleUsePromotion} disabled color={"$color.red10Dark"}>Not Valid</Button>
                    :
                    <Button onPress={handleUsePromotion} >Use</Button>
                }
            </Card.Footer>
        </Card>
    );
}