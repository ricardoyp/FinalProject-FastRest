import { Button, Spinner, Stack, View, YStack } from "tamagui"
import { SelectComponent } from "../components/Select"
import { useEffect, useState } from "react"
import { deletePlate, getCollectionAppetizers, getCollectionDesserts, getCollectionDrinks, getCollectionMainCourse } from "../API"
import { useMutation, useQuery } from "@tanstack/react-query"
import { queryClient } from "../config/queryClient"
import { MenuCard } from "../components/MenuCard"

export const AdminDeletePlate = ({ navigation }) => {
    const [val, setVal] = useState('')
    const [subval, setSubval] = useState('')
    const [subitems, setSubitems] = useState([])
    const [uid, setUid] = useState('')
    const [plate, setPlate] = useState()

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
                break;
            default:
                break;
        }
    }, [val]);

    useEffect(() => {
        switch (val) {
            case 'Appetizers':
                const appetizer = appetizers?.find(appetizer => appetizer.name === subval);
                setUid(appetizer.uid);
                setPlate(appetizer);
                break;
            case 'MainCourse':
                const mainCourse = mainCourses?.find(mainCourse => mainCourse.name === subval);
                setUid(mainCourse.uid);
                setPlate(mainCourse);
                break;
            case 'Desserts':
                const dessert = desserts?.find(dessert => dessert.name === subval);
                setUid(dessert.uid);
                setPlate(dessert);
                break;
            case 'Drinks':
                const drink = drinks?.find(drink => drink.name === subval);
                setUid(drink.uid);
                setPlate(drink);
                break;
            default:
                break;
        }
    }, [subval]);

    const { mutate: mutateDelete, isPending } = useMutation({
        mutationKey: ['mutateDelete'],
        mutationFn: () => deletePlate(val, uid),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allAppetizers'] });
            queryClient.invalidateQueries({ queryKey: ['allMaincourse'] });
            queryClient.invalidateQueries({ queryKey: ['allDesserts'] });
            queryClient.invalidateQueries({ queryKey: ['allDrinks'] });
            navigation.goBack();
        }
    });

    const handleDelete = () => {
        console.log(val, subval, uid);
        mutateDelete();
    }


    return (
        <>
            {isPending ?
                <Stack justifyContent="center" alignItems="center" style={{ flex: 1 }}>
                    <Spinner size="large" color="$blue10Light" />
                </Stack>
                :
                <View>
                    <YStack gap="3" padding="$4">
                        <SelectComponent items={items} value={val} onValueChange={setVal} />
                        <SelectComponent items={subitems} value={subval} onValueChange={setSubval} />
                        {plate && <MenuCard item={plate} />}
                        <Button onPress={handleDelete}>Delete Plate</Button>
                    </YStack>
                </View>
            }
        </>
    )
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
