import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button, H1, H3, Input, ScrollView, Separator, Stack } from "tamagui";

export const ProfileScreen = () => {
const { currentUser, updateChangesUser } = useContext(AuthContext);

const [name, setName] = useState('');

const handleChanges = () => {
    if (name !== '') {
        updateChangesUser(name);
        setName('');
    } else {
        alert('Name cannot be empty');
    }
}

return (
    <ScrollView>
        <Stack padding='$4' gap='$3'>
            <H1>NAME: {currentUser.displayName}</H1>
            <H3>EMAIL: {currentUser.email}</H3>
            <Separator borderColor={"$black025"} />
            <Input placeholder="Name" value={name} onChangeText={(text) => setName(text)}
            />
            <Button onPress={handleChanges}>Edit Profile</Button>
        </Stack>
    </ScrollView>
);
}