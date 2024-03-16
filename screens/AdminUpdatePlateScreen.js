import { useEffect, useState } from "react";
import { Button, Image, Input, Text, View, YStack } from "tamagui";
import { SelectComponent } from "../components/Select";
import { getCollectionAppetizers, getCollectionDesserts, getCollectionDrinks, getCollectionMainCourse, getIdsAppetizers } from "../API";
import { useMutation, useQuery } from "@tanstack/react-query";
import { launchImageLibraryAsync } from "expo-image-picker";
import { updatePlate } from "../API";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../config/firebase";
import { queryClient } from "../config/queryClient";

export const AdminUpdatePlate = ({ navigation }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [uid, setUid] = useState('');

    const [progress, setProgress] = useState(0);

    const [val, setVal] = useState('')
    const [subval, setSubval] = useState('')

    const [subitems, setSubitems] = useState([])

    const { data: appetizers } = useQuery({
        queryKey: ['allAppetizers'],
        queryFn: getCollectionAppetizers
    });
    const { data: mainCourses } = useQuery({
        queryKey: ['allMaincourse'],
        queryFn: getCollectionMainCourse
    });
    const { data: desserts } = useQuery({
        queryKey: ['allDesserts'],
        queryFn: getCollectionDesserts
    });

    const { data: drinks } = useQuery({
        queryKey: ['allDrinks'],
        queryFn: getCollectionDrinks
    });

    useEffect(() => {
        let platesObjects = [];
        switch (val) {
            case 'Appetizers':
                platesObjects = appetizers?.map((plate) => ({ name: plate.name }));
                setSubitems(platesObjects);
                break;
            case 'MainCourse':
                platesObjects = mainCourses?.map((plate) => ({ name: plate.name }));
                setSubitems(platesObjects);
                break;
            case 'Desserts':
                platesObjects = desserts?.map((plate) => ({ name: plate.name }));
                setSubitems(platesObjects);
                break;
            case 'Drinks': 
                platesObjects = drinks?.map((plate) => ({ name: plate.name }));
                setSubitems(platesObjects);
            default:
                break;
        }
    }, [val]);

    useEffect(() => {
        switch (val) {
            case 'Appetizers':
                appetizers?.map((plate) => {
                    if (plate.name === subval) {
                        setName(plate.name);
                        setDescription(plate.description);
                        setPrice(plate.price);
                        setImage(plate.imageUrl);
                        setUid(plate.uid);
                    }
                }
                );
                break;
            case 'MainCourse':
                mainCourses?.map((plate) => {
                    if (plate.name === subval) {
                        setName(plate.name);
                        setDescription(plate.description);
                        setPrice(plate.price);
                        setImage(plate.imageUrl);
                        setUid(plate.uid);
                    }
                }
                );
                break;
            case 'Desserts':
                desserts?.map((plate) => {
                    if (plate.name === subval) {
                        setName(plate.name);
                        setDescription(plate.description);
                        setPrice(plate.price);
                        setImage(plate.imageUrl);
                        setUid(plate.uid);
                    }
                }
                );
                break;
            case 'Drinks':
                drinks?.map((plate) => {
                    if (plate.name === subval) {
                        setName(plate.name);
                        setDescription(plate.description);
                        setPrice(plate.price);
                        setImage(plate.imageUrl);
                        setUid(plate.uid);
                    }
                }
                );
                break;
            default:
                break;
        }
    }, [subval]);

    const { mutate: mutateUpdate, isPending } = useMutation({
        mutationKey: ['mutationUpdate'],
        mutationFn: (plate) => updatePlate(val, uid, plate),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allAppetizers'] });
            queryClient.invalidateQueries({ queryKey: ['allMaincourse'] });
            queryClient.invalidateQueries({ queryKey: ['allDesserts'] });
            queryClient.invalidateQueries({ queryKey: ['allDrinks'] });
        }
    });

    const update = (imageUrl) => {
        const plate = {
            name: name,
            description: description,
            price: Number(price),
            imageUrl: imageUrl,
            uid: uid,
        }
        mutateUpdate(plate);
        console.log('VAL:', val)
        console.log('SUBVAL:', subval)
        console.log('UID:', uid)
        console.log('Plate:', plate);
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
            // setUrl(result.assets[0].uri);
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
                    update(downloadURL)
                    console.log('File available at', downloadURL);
                });
            }
        );
    }

    return (
        <View>
            <YStack gap="3" padding="$4">
                <Text fontSize={'$7'}>EDITAR PLATOS</Text>
                <SelectComponent items={items} value={val} onValueChange={setVal} />
                <SelectComponent items={subitems} value={subval} onValueChange={setSubval} />
                <Input placeholder="Name" value={name} onChangeText={(text) => { setName(text) }} />
                <Input placeholder="Description" value={description} onChangeText={(text) => { setDescription(text) }} />
                <Input placeholder="Price" value={price.toString()} onChangeText={(text) => { setPrice(text) }} />
                <Button onPress={pickImageAsync} onValueChange={handleChange}> Select a Image </Button>
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                <Button bordered onPress={handleUpload}> Update Plate </Button>
            </YStack>
        </View>
    );
}

const items = [
    {
        name: "Appetizers"
    },
    {
        name: "MainCourse"
    },
    {
        name: "Drinks"
    },
    {
        name: "Desserts"
    }
]
