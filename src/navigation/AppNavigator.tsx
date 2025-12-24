import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Thêm cái này
import AuthStack from './AuthStack';
import MainTab from './MainTab';
import { useAppStore } from '../store/appStore';
import { onAuthStateChanged } from '../api/firebaseAuth';
import { View, ActivityIndicator } from 'react-native';
import { COLORS } from '../utils/theme';

// Import thêm các màn hình đang bị thiếu vào đây
import SettingsScreen from '../screens/Profile/SettingsScreen';
import EditProfileScreen from '../screens/Profile/EditProfileScreen';
import { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    const { user, setUser, isInitializing } = useAppStore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged((firebaseUser) => {
            setUser(firebaseUser);
        });
        return unsubscribe;
    }, []);

    if (isInitializing) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
                <ActivityIndicator size="large" color={COLORS.primaryLight} />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {user ? (
                // Thay vì gọi trực tiếp MainTab, ta bọc nó trong 1 Stack
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    {/* Màn hình chính có thanh Tab */}
                    <Stack.Screen name="Main" component={MainTab} />
                    
                    {/* Đăng ký các màn hình phụ tại đây để có thể điều hướng tới */}
                    <Stack.Screen name="Settings" component={SettingsScreen} />
                    <Stack.Screen name="EditProfile" component={EditProfileScreen} />
                </Stack.Navigator>
            ) : (
                <AuthStack />
            )}
        </NavigationContainer>
    );
}