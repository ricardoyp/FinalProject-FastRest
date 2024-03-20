import { useState } from "react";
import { Button, Image, Input, ScrollView, Stack, Text, YStack } from "tamagui";
import { SelectComponent } from "../components/Select";
import { addDataAppetizers, addDataDessert, addDataDrinks, addDataMainPlates } from "../API";
import { launchImageLibraryAsync } from 'expo-image-picker';
import { storage } from "../config/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../config/queryClient";
import { XStack } from "tamagui";
import { CheckBoxAllergens } from "../components/CheckBox";

export const AdminAddPlate = ({ navigation }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [val, setVal] = useState('')
    const [image, setImage] = useState(null);
    const [uid, setUid] = useState(Date.now().toString());
    const [allergens, setAllergens] = useState([]);

    const [progress, setProgress] = useState(0);

    const createPlate = (imageUrl) => {
        const plate = {
            name: name,
            description: description,
            price: Number(price),
            imageUrl: imageUrl,
            uid: uid,
            allergens: allergens
        }

        switch (val) {
            case 'Appetizers':
                addDataAppetizers(uid, plate);
                break;
            case 'Main Course':
                addDataMainPlates(uid, plate);
                break;
            case 'Drinks':
                addDataDrinks(uid, plate);
                break;
            case 'Desserts':
                addDataDessert(uid, plate);
                break;
            default:
                break;
        }
        console.log('Plate added', plate);
        navigation.goBack();
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
                            mutateCreate(downloadURL);
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
            queryClient.invalidateQueries({ queryKey: ['allDrinks'] });
        }
    });

    return (
        <ScrollView>
            <YStack gap="3" padding="$4">
                <Text fontSize={'$7'}>AÑADIR PLATOS</Text>
                <SelectComponent items={items} value={val} onValueChange={setVal} />
                <Input placeholder="Name" onChangeText={(text) => { setName(text) }} />
                <Input placeholder="Description" onChangeText={(text) => { setDescription(text) }} />
                <Input placeholder="Price" onChangeText={(text) => { setPrice(text) }} />
                <Button onPress={pickImageAsync} onValueChange={handleChange}> Select a Image </Button>
                {image && <Image source={{ uri: image }} style={{ width: 'auto', height: 200 }} />}
                <Stack>
                    <Text>Alérgenos:</Text>
                    <XStack>
                        <YStack flex={1}>
                            <CheckBoxAllergens name="Gluten" setAllergens={setAllergens} allergens={allergens}/>
                            <CheckBoxAllergens name="Huevo" setAllergens={setAllergens} allergens={allergens} />
                            <CheckBoxAllergens name="Pescado" setAllergens={setAllergens} allergens={allergens} />
                        </YStack>
                        <YStack flex={1}>
                            <CheckBoxAllergens name="Soja" setAllergens={setAllergens} allergens={allergens} />
                            <CheckBoxAllergens name="Lactosa" setAllergens={setAllergens} allergens={allergens} />
                            <CheckBoxAllergens name="Sulfitos" setAllergens={setAllergens} allergens={allergens} />
                        </YStack>
                    </XStack>
                </Stack>
                <Button bordered onPress={handleUpload}> Add </Button>
            </YStack>
        </ScrollView>
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