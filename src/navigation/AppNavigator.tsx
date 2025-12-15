import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import MainTab from './MainTab';

export default function AppNavigator() {
    const isLoggedIn = false; // MOCK tạm

    return (
        <NavigationContainer>
            {isLoggedIn ? <MainTab /> : <AuthStack />}
        </NavigationContainer>
    );
}
