import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../config/firebase';

export const SettingsScreen = ({ navigation }) => {

    const user = auth.currentUser;

    const handleSignOut = async () => {
        try {
            await auth.signOut();
            console.log('Usuario deslogueado con éxito');
            navigation.navigate('Login');
        } catch (error) {
            console.error('Error al desloguear el usuario:', error);
            alert(error.message);
        }
    }

    return (
        <View style={styles.container}>
            {user ? (
                <Text style={styles.text}>Welcome, {user.email}!</Text>
            ) : (
                <Text style={styles.text}>No user logged in.</Text>
            )}
            <TouchableOpacity style={styles.button} onPress={handleSignOut}>
                <Text style={styles.buttontext}>Sign out</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
        gap: 20, // Space between elements
    },
    button: {
        backgroundColor: '#007bff', // Blue button
        paddingVertical: 10, // Padding above and below text
        paddingHorizontal: 20,
        borderRadius: 5,
        alignSelf: 'center', // Center button
    },
    buttonText: {
        color: '#fff', // White text
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});