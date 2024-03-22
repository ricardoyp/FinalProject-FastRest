import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import { useContext, useState } from 'react'
import { Button, H2, H3, Input, View } from 'tamagui';
import { AuthContext } from '../context/AuthContext';

export const LoginScreen = ({ navigation }) => {
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
            <View width={'75%'} gap={'$2'}>
                <H2>Login</H2>
                <Input placeholder='Email' value={email} onChangeText={(text) => setEmail(text)} />
                <Input secureTextEntry placeholder='Password' value={password} onChangeText={(text) => setPassword(text)} />
            </View>
            <View width={'50%'} gap={'$3'}>
                <Button onPress={() => handleLogin(email, password)} >Login</Button>
                <Button size={'$3'} alignSelf='flex-end' onPress={() => navigation.navigate('SignUp')}>Signup</Button>
            </View>
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
        gap: 10,
    },
});