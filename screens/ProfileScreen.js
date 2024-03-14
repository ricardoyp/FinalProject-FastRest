import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button, H1, H3, Input, ScrollView, Separator, Stack, Text } from "tamagui";
import { updateProfile } from "firebase/auth";

export const ProfileScreen = () => {
const { currentUser } = useContext(AuthContext);

const [name, setName] = useState('');

const handleChanges = async () => {
    if (name !== '') {
        try {
            await updateProfile(currentUser, {
                displayName: name,
            });

            alert('Nombre actualizado con éxito')
        } catch (error) {
            alert('Error al actualizar el nombre: ', error);
        }
    } else {
        alert('Por favor, introduce un nombre');
    }
}

return (
    <ScrollView>
        <Stack padding='$4' gap='$3'>
            <H1>NAME: {currentUser.displayName}</H1>
            <H3>EMAIL: {currentUser.email}</H3>
            <Separator borderColor={"$black025"} />
            <Input placeholder="Name" onChangeText={(text) => setName(text)}
            />
            <Button onPress={handleChanges}>Edit Profile</Button>
        </Stack>
    </ScrollView>
);
}