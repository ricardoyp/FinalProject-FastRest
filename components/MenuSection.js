import React from 'react';
import { Text, ScrollView } from 'react-native';
import { MenuCard } from './MenuCard';
import { XStack } from 'tamagui';

export const MenuSection = ({ title, data, type }) => {
    return (
        <>
            <Text style={{ fontSize: 24, fontWeight: 'bold', padding: 5 }}>{title}</Text>
            <ScrollView>
                <XStack gap="3">
                    {data?.map((item, index) => (
                        <MenuCard key={index} item={item} type={type} />
                    ))}
                </XStack>
            </ScrollView>
        </ >
    );
};

