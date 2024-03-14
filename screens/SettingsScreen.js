import { TouchableOpacity, View } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Avatar, Button, Separator, Text, XStack, YStack } from 'tamagui';

export const SettingsScreen = ({ navigation }) => {
    const { currentUser, signOut } = useContext(AuthContext);

    const handleSignOut = async () => {
        signOut();
    }

    return (
        <View>
            <XStack gap="3" padding="$4">
                <Text fontSize={'$7'} flex={1}>{currentUser.displayName}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Avatar size={'$8'} circular>
                        <Avatar.Image src="https://firebasestorage.googleapis.com/v0/b/restaurant-service-70ab8.appspot.com/o/perfilBLANK.png?alt=media&token=e5a9ce90-e1c0-4b52-967d-9a3fb2d13c0c" />
                    </Avatar>
                </TouchableOpacity>
            </XStack>
            <Separator marginVertical={5} />
            <YStack gap="$2" padding="$4">
                <Button bordered onPress={() => navigation.navigate('AdminAddPlate')}> ADMIN ADD </Button>
                <Button bordered onPress={() => navigation.navigate('AdminUpdatePlate')}> ADMIN UPDATE </Button>
                <Button bordered onPress={() => navigation.navigate('Order')}> Order History </Button>
                <Button bordered onPress={() => navigation.navigate('Promotions')}> Promotions </Button>
                <Button bordered color={'$red11'} onPress={handleSignOut}> Sign Out </Button>
            </YStack>
        </View>
    );
};
