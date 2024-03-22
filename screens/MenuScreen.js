import { getCollectionAppetizers, getCollectionDesserts, getCollectionDrinks, getCollectionMainCourse } from "../API";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, Button, H1, H2, H3, H4, H5, Input, ScrollView, SizableText, Stack, Tabs, Text, XStack, YStack, styled } from "tamagui";
import { Scan } from "@tamagui/lucide-icons";
import { MenuCard } from "../components/MenuCard";
import { SelectComponent } from "../components/Select";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";


export const MenuScreen = ({ navigation }) => {
    const [filter, setFilter] = useState('');
    const { tableNumber } = useContext(CartContext)

    return (
        <ScrollView showsHorizontalScrollIndicator={false}>
            <H1 padding={'$3'}>Bienvenido!</H1>
            <XStack paddingHorizontal='$3' gap='$3' justifyContent="space-between">
                {tableNumber ? <Input>Mesa🍽️: {tableNumber}</Input> : <Text fontSize={'$6'} alignSelf="center">Escanea el QR de tu mesa!</Text>}
                <Button borderColor={'$black025'} color={'$black'} size={'$4'} icon={Scan} onPress={() => navigation.navigate('Scan')}>
                    ScanQR
                </Button>
            </XStack>
            <XStack padding='$3'>
                <SelectComponent items={filters} value={filter} onValueChange={setFilter} />
            </XStack>
            <TabsMenu navigation={navigation} filter={filter} />
        </ScrollView>
    );
};

export const TabsMenu = ({ navigation, filter }) => {

    const { data: appetizers, isLoading: isLoadingAppetizers } = useQuery({
        queryKey: ['allAppetizers'],
        queryFn: getCollectionAppetizers,
    });

    const { data: maincourse, isLoading: isLoadingMainCourse } = useQuery({
        queryKey: ['allMaincourse'],
        queryFn: getCollectionMainCourse
    });

    const { data: desserts, isLoading: isLoadingDesserts } = useQuery({
        queryKey: ['allDesserts'],
        queryFn: getCollectionDesserts
    });

    const { data: drinks, isLoading: isLoadingDrinks } = useQuery({
        queryKey: ['allDrinks'],
        queryFn: getCollectionDrinks
    });

    const [tabState, setTabState] = useState({
        activeAt: null,
        currentTab: 0,
        intentAt: null,
        prevActiveAt: null,
    })

    const setCurrentTab = (currentTab) => setTabState({ ...tabState, currentTab })
    const setIntentIndicator = (intentAt) => setTabState({ ...tabState, intentAt })
    const setActiveIndicator = (activeAt) =>
        setTabState({ ...tabState, prevActiveAt: tabState.activeAt, activeAt })
    const { activeAt, intentAt, prevActiveAt, currentTab } = tabState
    const direction = (() => {
        if (!activeAt || !prevActiveAt || activeAt.x === prevActiveAt.x) {
            return 0
        }
        return activeAt.x > prevActiveAt.x ? -1 : 1
    })()

    const enterVariant =
        direction === 1 ? 'isLeft' : direction === -1 ? 'isRight' : 'defaultFade'
    const exitVariant =
        direction === 1 ? 'isRight' : direction === -1 ? 'isLeft' : 'defaultFade'

    const handleOnInteraction = (type, layout) => {
        if (type === 'select') {
            setActiveIndicator(layout)
        } else {
            setIntentIndicator(layout)
        }
    }

    const TabsContent = [
        <>
            <H2 paddingLeft='$3' paddingBottom='$2'>Appetizers</H2>
            <Stack paddingHorizontal='$3' gap='$3' width={'100%'}>
                {appetizers?.filter(item => !item.allergens.includes(filter)).map((item, index) => (
                    <MenuCard key={index} item={item} />
                ))}
            </Stack>
            <H2 paddingLeft='$3' paddingBottom='$2'>Main courses</H2>
            <Stack paddingHorizontal='$3' gap='$3' width={'100%'}>
                {maincourse?.filter(item => !item.allergens.includes(filter)).map((item, index) => (
                    <MenuCard key={index} item={item} />
                ))}
            </Stack>
        </>,
        <>
            <H2 paddingLeft='$3' paddingBottom='$2'>Drinks</H2>
            <Stack paddingHorizontal='$3' gap='$3' width={'100%'}>
                {drinks?.map((item, index) => (
                    <MenuCard key={index} item={item} />
                ))}
            </Stack>
        </>,
        <>
            <H2 paddingLeft='$3' paddingBottom='$2'>Desserts</H2>
            <Stack paddingHorizontal='$3' gap='$3' width={'100%'}>
                {desserts?.filter(item => !item.allergens.includes(filter)).map((item, index) => (
                    <MenuCard key={index} item={item} />
                ))}
            </Stack>
        </>
    ]

    return (
        <Tabs
            value={currentTab}
            onValueChange={setCurrentTab}
            flexDirection="column"
        >
            <YStack>
                <AnimatePresence>
                    {intentAt && (
                        <TabsRovingIndicator
                            borderRadius="$6"
                            width={intentAt.width}
                            height={intentAt.height}
                            x={intentAt.x}
                            y={intentAt.y}
                        />
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {activeAt && (
                        <TabsRovingIndicator
                            borderRadius="$6"
                            theme="active"
                            width={activeAt.width}
                            height={activeAt.height}
                            x={activeAt.x}
                            y={activeAt.y}
                        />
                    )}
                </AnimatePresence>

                <Tabs.List
                    backgroundColor="transparent"
                    justifyContent="space-evenly"
                    paddingVertical="$2"
                >
                    <Tabs.Tab
                        unstyled
                        paddingVertical="$2"
                        paddingHorizontal="$3"
                        value={0}
                        onInteraction={handleOnInteraction}
                    >
                        <H5>Food</H5>
                    </Tabs.Tab>
                    <Tabs.Tab
                        unstyled
                        paddingVertical="$2"
                        paddingHorizontal="$3"
                        value={1}
                        onInteraction={handleOnInteraction}
                    >
                        <H5>Drinks</H5>
                    </Tabs.Tab>
                    <Tabs.Tab
                        unstyled
                        paddingVertical="$2"
                        paddingHorizontal="$3"
                        value={2}
                        onInteraction={handleOnInteraction}
                    >
                        <H5>Desserts</H5>
                    </Tabs.Tab>
                </Tabs.List>
            </YStack>

            <AnimatePresence
                exitBeforeEnter
                enterVariant={enterVariant}
                exitVariant={exitVariant}
            >
                <AnimatedYStack key={currentTab} animation="100ms" x={0} opacity={1} flex={1}>
                    <Tabs.Content value={currentTab} justifyContent="center">
                        {TabsContent[currentTab]}
                    </Tabs.Content>
                </AnimatedYStack>
            </AnimatePresence>
        </Tabs>
    )


}


const TabsRovingIndicator = ({ active, ...props }) => {
    return (
        <YStack
            position="absolute"
            backgroundColor="$colorHover"
            opacity={0.2}
            animation="100ms"
            enterStyle={{
                opacity: 0,
            }}
            exitStyle={{
                opacity: 0,
            }}
            {...(active && {
                backgroundColor: '$color8',
                opacity: 0.7,
            })}
            {...props}
        />
    )
}

const AnimatedYStack = styled(YStack, {
    variants: {
        isLeft: { true: { x: -25, opacity: 0 } },
        isRight: { true: { x: 25, opacity: 0 } },
        defaultFade: { true: { opacity: 0 } },
    }
})

const filters = [
    { name: 'Gluten' },
    { name: 'Lactosa' },
    { name: 'Sulfitos' },
    { name: 'Pescado' },
    { name: 'Soja' },
    { name: 'Huevo' },
    { name: 'All' }
];


