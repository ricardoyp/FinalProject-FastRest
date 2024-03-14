import { Button, View, YStack } from "tamagui"
import { SelectComponent } from "../components/Select"
import { useEffect, useState } from "react"
import { deletePlate, getCollectionAppetizers, getCollectionDesserts, getCollectionMainCourse } from "../API"
import { useQuery } from "@tanstack/react-query"

export const AdminDeletePlate = () => {
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

    useEffect(() => {
        let platesObjects = [];
        switch (val) {
            case 'Appetizers':
                platesObjects = appetizers?.map((plate) => ({ name: plate.name }));
                setSubitems(platesObjects);
                break;
            case 'Main Course':
                platesObjects = mainCourses?.map((plate) => ({ name: plate.name }));
                setSubitems(platesObjects);
                break;
            case 'Desserts':
                platesObjects = desserts?.map((plate) => ({ name: plate.name }));
                setSubitems(platesObjects);
                break;
            default:
                break;
        }
    }, [val]);

    const handleDelete = () => {
        console.log(val, subval);
        deletePlate(val, subval);
    }

    return (
        <View>
            <YStack gap="3" padding="$4">
                <SelectComponent items={items} value={val} onValueChange={setVal} />
                <SelectComponent items={subitems} value={subval} onValueChange={setSubval} />
                <Button onPress={handleDelete}>Delete Plate</Button>
            </YStack>
        </View>
    )
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
