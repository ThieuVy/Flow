import React from 'react';
import { View, Text } from 'react-native';
import { COLORS } from '../../utils/theme';

export default function MapScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
            <Text style={{ color: COLORS.textPrimary }}>Map Screen</Text>
        </View>
    );
}