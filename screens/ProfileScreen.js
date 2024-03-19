import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button, H1, H3, Input, ScrollView, Separator, Stack } from "tamagui";

export const ProfileScreen = () => {
    const { currentUser, updateChangesUser } = useContext(AuthContext);

    const [name, setName] = useState(currentUser.displayName);
    const [email, setEmail] = useState(currentUser.email);

    const handleChanges = () => {
        if (name === '') {
            alert('Name cannot be empty');
        } else if (email === '') {
            alert('Email cannot be empty');
        } else {
            updateChangesUser(name, email);
        }
    }

        return (
            <ScrollView>
                <Stack padding='$4' gap='$3'>
                    <H1>NAME: {currentUser.displayName}</H1>
                    <H3>EMAIL: {currentUser.email}</H3>
                    <Separator borderColor={"$black025"} />
                    <Input placeholder="Name" value={name} onChangeText={(text) => setName(text)} />
                    <Input placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} />
                    <Button onPress={handleChanges}>Edit Profile</Button>
                </Stack>
            </ScrollView>
        );
    }