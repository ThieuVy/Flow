import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

// Screens
import SplashScreen from '../screens/Auth/SplashScreen';
import OnboardingScreen from '../screens/Auth/OnboardingScreen';
import LoginScreen from '../screens/Auth/LoginScreen'; // <--- Import màn hình thật

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                <Stack.Screen name="Login" component={LoginScreen} /> 
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;