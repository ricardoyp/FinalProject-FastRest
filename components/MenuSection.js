import React from 'react';
import { Text, ScrollView } from 'react-native';
import { MenuCard } from './MenuCard';
import { View, XStack } from 'tamagui';

export const MenuSection = ({ title, data, type }) => {
    return (
        <View>
            <Text style={{ fontSize: 24, fontWeight: 'bold', padding: 5 }}>{title}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <XStack gap="$1.5" paddingLeft="$1.5">
                    {data?.map((item, index) => (
                        <MenuCard key={index} item={item} type={type} />
                    ))}
                </XStack>
            </ScrollView>
        </ View>
    );
};

