import { useState } from "react";
import { Button, Input, Text, View, YStack } from "tamagui";
import { SelectComponent } from "../components/Select";
import { addDataAppetizers, addDataDessert, addDataMainPlates } from "../API";
import { launchImageLibraryAsync } from 'expo-image-picker';
import { storage } from "../config/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../App";

export const AdminAddPlate = ({ navigation }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [val, setVal] = useState('')
    const [image, setImage] = useState(null);
    const [uid, setUid] = useState(Date.now().toString());

    const [progress, setProgress] = useState(0);

    const createPlate = (imageUrl) => {  
        const plate = {
            name: name,
            description: description,
            price: Number(price),
            imageUrl: imageUrl,
            uid: uid
        }

        switch (val) {
            case 'Appetizers':
                addDataAppetizers(uid, plate);
                break;
            case 'Main Course':
                addDataMainPlates(uid, plate);
                break;
            case 'Drinks':
                break;
            case 'Desserts':
                addDataDessert(uid, plate);
                break;
            default:
                break;
        }
        console.log('Plate added', plate);
    }

    const pickImageAsync = async () => {
        let result = await launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });


        if (!result.canceled) {
            console.log(result);
            setImage(result.assets[0].uri);
        } else {
            alert('You did not select any image.');
        }
    };

    const handleChange = (e) => {
        console.log(e.target.files.assets[0].uri);
        if (e.target.files.assets[0].uri) {
            setImage(e.target.files.assets[0].uri);
        }
    }

    const handleUpload = async () => { 
        const response = await fetch(image);
        const blob = await response.blob();
        const filename = image.split('/').pop();

        const storageRef = ref(storage, `imagesPlates/${filename}`);

        const uploadTask = uploadBytesResumable(storageRef, blob);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                console.error(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    switch (val) {
                        case 'Appetizers':
                            mutateCreate(downloadURL);
                            break;
                        case 'Main Course':
                            mutateCreate(downloadURL);
                            break;
                        case 'Drinks':
                            break;
                        case 'Desserts':
                            mutateCreate(downloadURL);
                            break;
                        default:
                            break;
                    }
                });
            }
            );
    }

    const { mutate: mutateCreate, isPending } = useMutation({
        mutationKey: ['mutateCreate'],
        mutationFn: (url) => createPlate(url), 
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allAppetizers'] }); 
            queryClient.invalidateQueries({ queryKey: ['allMaincourse'] }); 
            queryClient.invalidateQueries({ queryKey: ['allDesserts'] });
        }
    });

    return (
        <View>
            <YStack gap="3" padding="$4">
                <Text fontSize={'$7'}>AÑADIR PLATOS</Text>
                <SelectComponent items={items} value={val} onValueChange={setVal} />
                <Input placeholder="Name" onChangeText={(text) => { setName(text) }} />
                <Input placeholder="Description" onChangeText={(text) => { setDescription(text) }} />
                <Input placeholder="Price" onChangeText={(text) => { setPrice(text) }}/>
                <Button onPress={pickImageAsync} onValueChange={handleChange}> Select a Image </Button>
                <Button bordered onPress={handleUpload}> Add </Button>
            </YStack>
        </View>
    );
}

const items = [
    {
        name: "Appetizers"
    },
    {
        name: "Main Course"
    },
    {
        name: "Drinks"
    },
    {
        name: "Desserts"
    }
]