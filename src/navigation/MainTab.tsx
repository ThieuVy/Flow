import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from '../utils/theme';
import Svg, { Path, Circle, G } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';

// Screens
import HomeScreen from '../screens/Home/HomeScreen';
import MapScreen from '../screens/Map/MapScreen';
import CommunityScreen from '../screens/Community/CommunityScreen';
import AdoptionScreen from '../screens/Adoption/AdoptionScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const Tab = createBottomTabNavigator();

// Icons
const Icons = {
    Home: ({ color }: { color: string }) => (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><Path d="M9 22V12h6v10" /></Svg>
    ),
    Map: ({ color }: { color: string }) => (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><Circle cx="12" cy="12" r="10" /><Path d="M12 8l4.8 3.2-1.8 1.2M12 16v-4" /></Svg>
    ),
    Community: ({ color }: { color: string }) => (
        // Icon Plus cho nút giữa
        <Svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><Path d="M12 5v14M5 12h14" /></Svg>
    ),
    Adoption: ({ color }: { color: string }) => (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><Path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><Path d="M3.27 6.96L12 12.01l8.73-5.05" /><Path d="M12 22.08V12" /></Svg>
    ),
    Profile: ({ color }: { color: string }) => (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><Circle cx="12" cy="7" r="4" /></Svg>
    ),
};

const CustomTabBarButton = ({ children, onPress }: any) => (
    <TouchableOpacity
        style={{
            top: -25, // Nổi lên trên
            justifyContent: 'center',
            alignItems: 'center',
            ...styles.shadow
        }}
        onPress={onPress}
    >
        <LinearGradient
            colors={[COLORS.primaryLight, COLORS.primary]}
            style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {children}
        </LinearGradient>
    </TouchableOpacity>
);

export default function MainTab() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar,
                tabBarActiveTintColor: COLORS.primaryLight,
                tabBarInactiveTintColor: '#64748B',
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: ({ color }) => <Icons.Home color={color} /> }} />
            <Tab.Screen name="Map" component={MapScreen} options={{ tabBarIcon: ({ color }) => <Icons.Map color={color} /> }} />
            
            {/* Nút Cộng đồng ở giữa */}
            <Tab.Screen
                name="Community"
                component={CommunityScreen}
                options={{
                    tabBarIcon: ({ focused }) => <Icons.Community color={COLORS.white} />,
                    tabBarButton: (props) => <CustomTabBarButton {...props} />
                }}
            />

            <Tab.Screen name="Adoption" component={AdoptionScreen} options={{ tabBarIcon: ({ color }) => <Icons.Adoption color={color} /> }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon: ({ color }) => <Icons.Profile color={color} /> }} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        elevation: 0,
        backgroundColor: COLORS.surface,
        borderRadius: 24,
        height: 70,
        borderTopWidth: 0,
        paddingBottom: 0,
    },
    shadow: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    }
});