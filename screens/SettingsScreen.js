import { View } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Button, Text } from 'tamagui';

export const SettingsScreen = ({navigation}) => {
    const { currentUser, signOut } = useContext(AuthContext);

    const handleSignOut = async () => {
        signOut();
    }

    return (
        <View >
            <Text>WELCOME {currentUser.displayName}</Text>
            <Button bordered onPress={() => navigation.navigate('Order')}> Order History </Button>
            <Button bordered onPress={() => navigation.navigate('Profile')}> Profile </Button>
            <Button bordered onPress={() => navigation.navigate('Promotions')}> Promotions </Button>
            <Button bordered backgroundColor={'$red1Light'} color={'$red11'} onPress={handleSignOut}> Sign Out </Button>
        </View>
    );
};

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center', // Center vertically
//         alignItems: 'center', // Center horizontally
//         gap: 20, // Space between elements
//     },
//     button: {
//         backgroundColor: '#007bff', // Blue button
//         paddingVertical: 10, // Padding above and below text
//         paddingHorizontal: 20,
//         borderRadius: 5,
//         alignSelf: 'center', // Center button
//     },
//     buttonText: {
//         color: '#fff', // White text
//         fontSize: 16,
//         fontWeight: 'bold',
//         textAlign: 'center',
//     },
// });