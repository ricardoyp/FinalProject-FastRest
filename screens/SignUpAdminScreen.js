import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../config/firebase';
import { Button } from 'tamagui';
import { createUser } from '../API';

export const SignupAdminScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [adminCode, setAdminCode] = useState('');

    const handleSignUp = async () => {
        try {
            if (adminCode !== process.env.EXPO_PUBLIC_ADMIN_CODE) {
                alert('El código de administrador es incorrecto');
                return;
            }

            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            await updateProfile(userCredential.user, {
                displayName: name,
            });

            const user = {
                uid: userCredential.user.uid,
                displayName: userCredential.user.displayName,
                email: userCredential.user.email,
                rol: "admin",
            }            

            await createUser( user, user.uid);

            console.log('Usuario registrado con éxito:', userCredential.user);
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            alert(error.message);
        }
    };

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <View>
                <Text style={styles.text}>SignUp</Text>
                <TextInput
                    placeholder='Name'
                    style={styles.textInput}
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
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
                <TextInput
                    placeholder='···ADMINCODE···'
                    style={styles.textInput}
                    value={adminCode}
                    onChangeText={(text) => setAdminCode(text)}
                />
                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>SignUp</Text>
                </TouchableOpacity>
                <Button onPress={() => navigation.navigate('Login')}>Login</Button>
                <Button onPress={() => navigation.navigate('SignUp')}>I'm Client</Button>
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