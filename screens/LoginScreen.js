import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useContext, useState } from 'react'
import { Button } from 'tamagui';
import { AuthContext } from '../context/AuthContext';

export const LoginScreen = ({navigation}) => {
    const { signIn, currentUser } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // console.log(auth)

    const handleLogin = async () => {
        signIn(email, password);
        console.log('Usuario logueado:', currentUser);
    };

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <View>
                <Text style={styles.text}>Login</Text>
                <TextInput
                    placeholder='Email'
                    style={styles.textInput}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    secureTextEntry
                    placeholder='Password'
                    style={styles.textInput}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity style={styles.button} onPress={ () => handleLogin(email, password)}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.buttonText}>Go to Settings</Text>
            </TouchableOpacity>
            <Button onPress={() => navigation.navigate('SignUp')}>Signup</Button>
        </KeyboardAvoidingView>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
        backgroundColor: '#F5FCFF', // Light gray background
        paddingHorizontal: 20, // Padding on both sides
        paddingTop: 50, // Padding at the top
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10, // Margin below text
    },
    textInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20, // Margin below input
        paddingHorizontal: 10,
        width: 250,
    },
    button: {
        backgroundColor: '#007bff', // Blue button
        paddingVertical: 10, // Padding above and below text
        paddingHorizontal: 20,
        borderRadius: 5,
        width: 150,
        alignSelf: 'center', // Center button
    },
    buttonText: {
        color: '#fff', // White text
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});