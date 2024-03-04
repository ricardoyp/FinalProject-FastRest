import { getCollectionAppetizers, getCollectionDesserts, getCollectionMainCourse } from "../API";
import { useQuery } from "@tanstack/react-query";
import { MenuSection } from "../components/MenuSection";
import { ScrollView } from "tamagui";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const MenuScreen = () => {
    const { currentUser } = useContext(AuthContext);

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
        <ScrollView showsVerticalScrollIndicator={false} >
            <MenuSection title="Appetizers" data={appetizers} type="appetizer" />
            <MenuSection title="Maincourse" data={maincourse} type="mainplate" />
            <MenuSection title="Desserts" data={desserts} type="dessert" />
        </ScrollView>
    );
};
