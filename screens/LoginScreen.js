import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useContext, useState } from 'react'
import { Button, Input } from 'tamagui';
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
            <View width={'75%'}>
                <Text style={styles.text}>Login</Text>
                <Input placeholder='Email' value={email} onChangeText={(text) => setEmail(text)} />
                <Input placeholder='Password' value={password} onChangeText={(text) => setPassword(text)} />
            </View>
            <Button onPress={ () => handleLogin(email, password)} width={'50%'}>Login</Button>
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
});