import { KeyboardAvoidingView, StyleSheet, Text } from 'react-native'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../config/firebase';
import { Button, Input, Stack, View } from 'tamagui';
import { createUser } from '../API';

export const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSignUp = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            await updateProfile(userCredential.user, {
                displayName: name,
                photoURL: "../public/images/perfilBLANK.png"
            });

            const user = {
                uid: userCredential.user.uid,
                displayName: userCredential.user.displayName,
                email: userCredential.user.email,
                rol: "client",
            }

            await createUser(user, user.uid);

            console.log('Usuario registrado con éxito:', userCredential.user);
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            alert(error.message);
        }
    };

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <Stack width={'75%'} gap={'$2'}>
                <Text style={styles.text}>SignUp</Text>
                <Input placeholder='Name' value={name} onChangeText={(text) => setName(text)} />
                <Input placeholder='Email' value={email} onChangeText={(text) => setEmail(text)} />
                <Input secureTextEntry placeholder='Password' value={password} onChangeText={(text) => setPassword(text)} />
            </Stack>
            <Stack width={'50%'} gap={'$3'}>
                <Button onPress={handleSignUp}>SignUp</Button>
                <Button size={'$3'} alignSelf='flex-end' onPress={() => navigation.navigate('Login')}>Login</Button>
            </Stack>
            <View alignSelf='flex-start'>
                <Button unstyled onPress={() => navigation.navigate('SignUpAdmin')}>Not Client</Button>
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
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});