import { useState } from "react";
import { Button, Input, Text, View, YStack } from "tamagui";
import { SelectComponent } from "../components/Select";
import { addDataAppetizers, addDataDessert, addDataMainPlates } from "../API";
import { launchImageLibraryAsync } from 'expo-image-picker';
import { storage } from "../config/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const AdminOptionsScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [val, setVal] = useState('')
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    const createPlate = (imageUrl) => {   
        const plate = {
            name: name,
            description: description,
            price: price,
            imageUrl: imageUrl
        }
        console.log('Plate:', plate)    

        switch (val) {
            case 'appetizers':
                addDataAppetizers(name, plate);
                console.log('Plate:', plate)
                break;
            case 'main Course':
                addDataMainPlates(name, plate);
                break;
            case 'drinks':
                break;
            case 'desserts':
                addDataDessert(name, plate);
                break;
            default:
                break;
        }
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
                    createPlate(downloadURL)
                });
            }
            );
    }


    return (
        <View>
            <YStack gap="3" padding="$4">
                <Text fontSize={'$7'}>AÑADIR PLATOS</Text>
                <SelectComponent items={items} value={val} onValueChange={setVal} />
                <Input placeholder="Name" onChangeText={(text) => { setName(text) }} />
                <Input placeholder="Description" onChangeText={(text) => { setDescription(text) }} />
                <Input placeholder="Price" onChangeText={(text) => { setPrice(text) }} />
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