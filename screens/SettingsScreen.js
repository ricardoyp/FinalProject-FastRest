import { TouchableOpacity, View } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Avatar, Button, H1, H2, H3, Separator, Stack, Text, XStack, YStack } from 'tamagui';
import { getRol } from '../API';
import { useQuery } from '@tanstack/react-query';

export const SettingsScreen = ({ navigation }) => {
    const { currentUser, signOut } = useContext(AuthContext);

    const handleSignOut = async () => {
        signOut();
    }
    const { data: rol } = useQuery({
        queryKey: ['getRol'],
        queryFn: () => getRol(currentUser.uid),
    });

    return (
        <View>
            <XStack gap="3" padding="$4">
                <Stack paddingRight={'$3'}>
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                        <Avatar size={'$8'} circular>
                            <Avatar.Image src="https://firebasestorage.googleapis.com/v0/b/restaurant-service-70ab8.appspot.com/o/perfilBLANK.png?alt=media&token=e5a9ce90-e1c0-4b52-967d-9a3fb2d13c0c" />
                        </Avatar>
                    </TouchableOpacity>
                </Stack>
                <H2 flex={1}>{currentUser.displayName}</H2>
            </XStack>
            <YStack gap="$2" padding="$4">
                {rol === 'admin' &&
                    <Stack gap={'$2'} paddingVertical={'$3'}>
                        <Separator borderColor={'$black025'} />
                        <H3 alignSelf='center' fontSize={'$7'}>ADMIN FUNCTIONS</H3>
                        <Button bordered onPress={() => navigation.navigate('AdminAddPlate')}>ADD PLATE</Button>
                        <Button bordered onPress={() => navigation.navigate('AdminUpdatePlate')}>UPDATE PLATE</Button>
                        <Button bordered onPress={() => navigation.navigate('AdminDeletePlate')}>DELETE PLATE</Button>
                        <Button bordered onPress={() => navigation.navigate('AdminCreatePromotion')}> ADD PROMOTION</Button>
                        <Separator borderColor={'$black025'} paddingVertical={'$2'} />
                    </Stack>
                }
                <Button bordered onPress={() => navigation.navigate('Order')}> Order History </Button>
                <Button bordered onPress={() => navigation.navigate('Promotions')}> Promotions </Button>
                <Button bordered color={'$red11'} onPress={handleSignOut}> Sign Out </Button>
            </YStack>
        </View>
    );
};
