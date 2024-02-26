import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getCollection } from "../API";
import { useEffect } from "react";

export const MenuScreen = ({ navigation }) => {

    let menu = [];

    useEffect(() => {
        menu = getCollection('menu');
    }
        , []);

    menu.map((item, index) => {
        console.log(item);
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Settings')}>
                <Text style={styles.buttonText}>Go to Settings</Text>
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