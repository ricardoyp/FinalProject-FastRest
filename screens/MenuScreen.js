import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getCollectionAppetizers } from "../API";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, H2, Image, Paragraph, ScrollView, XStack } from "tamagui";

export const MenuScreen = ({ navigation }) => {

    const { data: appetizers, isLoading: isLoadingGet } = useQuery({
        queryKey: ['allAppetizers'],
        queryFn: getCollectionAppetizers
    });

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', padding: 5 }}>Appetizers</Text>
            <ScrollView>
                <XStack gap="$3">
                    {appetizers?.map((appetizer, index) => {
                        return (
                            <Card key={index} elevate size="$2" bordered width={250}>
                                <Card.Header padded>
                                    <H2>{appetizer.name}</H2>
                                    <Paragraph theme="alt2">{appetizer.description}</Paragraph>
                                </Card.Header>
                                <Card.Footer padded>
                                    <XStack flex={1} />
                                    <Button borderRadius="$10">Purchase</Button>
                                </Card.Footer>
                                <Card.Background>
                                    <Image
                                        resizeMode="contain"
                                        alignSelf="center"
                                        source={appetizer.image}
                                    />
                                </Card.Background>
                            </Card>
                        );
                    })}
                </XStack>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
    }
});