import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from '../utils/theme'; // Import Theme

// Screens
import MapScreen from '../screens/Map/MapScreen';
import AdoptionScreen from '../screens/Adoption/AdoptionScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function MainTab() {
    return (
        <Tab.Navigator 
            screenOptions={{ 
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: COLORS.surface, // Màu nền tab bar
                    borderTopColor: COLORS.border,
                },
                tabBarActiveTintColor: COLORS.primaryLight,
                tabBarInactiveTintColor: COLORS.textSecondary,
            }}
        >
            <Tab.Screen name="Map" component={MapScreen} />
            <Tab.Screen name="Adoption" component={AdoptionScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}