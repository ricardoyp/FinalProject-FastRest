import { getCollectionAppetizers, getCollectionDesserts, getCollectionMainCourse } from "../API";
import { useQuery } from "@tanstack/react-query";
import { Button, H2, ScrollView, Stack, Tabs, Text, View } from "tamagui";
import { Scan } from "@tamagui/lucide-icons";
import { MenuCard } from "../components/MenuCard";

export const MenuScreen = ({ navigation }) => {
    return (
        <ScrollView>
            <Stack flexDirection="row" padding='$2'>
                <Button size={'$6'} icon={Scan} onPress={() => navigation.navigate('Scan')}>
                    ScanQR
                </Button>

            </Stack>
            <TabsMenu />
        </ScrollView>
    );
};

export const TabsMenu = () => {

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
        <ScrollView>
            <Tabs defaultValue="tab1" width={'100%'} flexDirection='column'>
                <Tabs.List justifyContent='space-evenly'>
                    <Tabs.Tab value="tab1">
                        <Text>Food</Text>
                    </Tabs.Tab>
                    <Tabs.Tab value="tab2">
                        <Text>Drinks</Text>
                    </Tabs.Tab>
                    <Tabs.Tab value="tab3">
                        <Text>Desserts</Text>
                    </Tabs.Tab>
                </Tabs.List>
                <Tabs.Content value="tab1">
                    <H2 paddingLeft='$3'>Appetizers</H2>
                    <Stack paddingHorizontal='$3' gap='$3' width={'100%'}>
                        {appetizers?.map((item, index) => (
                            <MenuCard key={index} item={item} />
                        ))}
                    </Stack>
                    <H2 paddingLeft='$3'>Main courses</H2>
                    <Stack paddingHorizontal='$3' gap='$3' width={'100%'}>
                        {maincourse?.map((item, index) => (
                            <MenuCard key={index} item={item} />
                        ))}
                    </Stack>
                </Tabs.Content>
                <Tabs.Content value="tab2">
                </Tabs.Content>
                <Tabs.Content value="tab3">
                    <H2 paddingLeft='$3'>Desserts</H2>
                    <Stack paddingHorizontal='$3' gap='$3' width={'100%'}>
                        {desserts?.map((item, index) => (
                            <MenuCard key={index} item={item} />
                        ))}
                    </Stack>
                </Tabs.Content>
            </Tabs>
        </ScrollView>

    )
}

