import { StyleSheet } from "react-native";
import { getCollectionAppetizers, getCollectionDesserts, getCollectionMainCourse } from "../API";
import { useQuery } from "@tanstack/react-query";
import { MenuSection } from "../components/MenuSection";
import { ScrollView } from "tamagui";

export const MenuScreen = ({ navigation }) => {

    const { data: appetizers } = useQuery({
        queryKey: ['allAppetizers'],
        queryFn: getCollectionAppetizers
    });

    const { data: maincourse } = useQuery({
        queryKey: ['allMaincourse'],
        queryFn: getCollectionMainCourse
    });

    const { data: desserts } = useQuery({
        queryKey: ['allDesserts'],
        queryFn: getCollectionDesserts
    });

    return (
            <ScrollView >
                <MenuSection title="Appetizers" data={appetizers} type="appetizer" />
                <MenuSection title="Maincourse" data={maincourse} type="mainplate" />
                <MenuSection title="Desserts" data={desserts} type="dessert" />
            </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
    }
});