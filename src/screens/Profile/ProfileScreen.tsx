import React from 'react';
import { View, Text } from 'react-native';
import { COLORS } from '../../utils/theme';

export default function ProfileScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
            <Text>Profile Screen</Text>
        </View>
    );
}
