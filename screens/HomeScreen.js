import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const SettingsScreen = () => {
    const { currentUser, signOut } = useContext(AuthContext);

    const handleSignOut = async () => {
        signOut();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome, {currentUser.displayName}!</Text>
            <TouchableOpacity style={styles.button} onPress={handleSignOut}>
                <Text style={styles.buttonText}>Sign out</Text>
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