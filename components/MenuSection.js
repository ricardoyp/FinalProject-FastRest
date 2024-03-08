import { MenuCard } from './MenuCard';
import { ScrollView, Stack, Text, XStack } from 'tamagui';

export const MenuSection = ({ title, data, type }) => {
    return (
        <Stack >
            <Text padding={'$2'} alignSelf='center' fontSize={'$8'}>{title}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                <XStack gap='$3' paddingHorizontal={'$3'} >
                    {data?.map((item, index) => (
                        <MenuCard key={index} item={item} type={type} />
                    ))}
                </XStack>
            </ScrollView>
        </ Stack>
    );
};

