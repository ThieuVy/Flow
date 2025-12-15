import React, { useState } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, StatusBar, TextInput,
    Dimensions, KeyboardAvoidingView, Platform, ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path, Circle, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useAppStore } from '../../store/appStore';
import { COLORS } from '../../utils/theme';

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'Login'> };
const { width, height } = Dimensions.get('window');

// --- Icons ---
const GoogleIcon = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24">
        <Path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <Path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <Path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" />
        <Path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </Svg>
);
const FacebookIcon = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24">
        <Path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" fill="#1877F2" />
    </Svg>
);
const AppleIcon = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24">
        <Path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24.39-1.44 1.1-2.26 1.16-3.7.19-2.22-1.5-3.7-5.07-2.9-8.48.53-2.27 2.45-3.69 4.63-3.69 1.09 0 2 .47 2.76.47.7 0 1.95-.5 3.02-.5 1.5 0 2.82.85 3.55 1.95-3.21 1.66-2.53 6.36.78 7.7-.58 1.77-1.39 3.08-1.82 3.57zM12.03 7.25c-.14-2.14 1.7-3.9 3.6-4.22.25 2.37-2.16 4.36-3.6 4.22z" fill="#000" />
    </Svg>
);
const BackIcon = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M15 18l-6-6 6-6" />
    </Svg>
);

const LoginScreen = ({ navigation }: Props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const completeOnboarding = useAppStore((state) => state.completeOnboarding);

    const handleLogin = () => { completeOnboarding(); };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            
            {/* 1. Header Area (Dark Blue + Graphics) - Top 30% */}
            <View style={styles.headerArea}>
                <LinearGradient
                    colors={['#0F172A', '#1E40AF']}
                    style={StyleSheet.absoluteFill}
                />
                <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
                    <Defs>
                        <SvgLinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                            <Stop offset="0" stopColor="#60A5FA" stopOpacity="0.4" />
                            <Stop offset="1" stopColor="#60A5FA" stopOpacity="0" />
                        </SvgLinearGradient>
                    </Defs>
                    <Circle cx={width} cy="0" r="140" fill="url(#grad)" />
                    <Circle cx="40" cy="80" r="60" fill="#2563EB" opacity="0.3" />
                </Svg>
                
                {/* Back Button */}
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <BackIcon />
                </TouchableOpacity>

                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>Đăng nhập</Text>
                    <Text style={styles.headerSubtitle}>Chào mừng bạn quay lại!</Text>
                </View>
            </View>

            {/* 2. Bottom Sheet (White) - Bottom 70% */}
            <View style={styles.bottomSheet}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                        
                        {/* Forms */}
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập email của bạn"
                                placeholderTextColor="#94A3B8"
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Mật khẩu</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập mật khẩu"
                                placeholderTextColor="#94A3B8"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>

                        {/* Options */}
                        <View style={styles.rowBetween}>
                            <TouchableOpacity style={styles.checkboxRow} onPress={() => setIsChecked(!isChecked)}>
                                <View style={[styles.checkbox, isChecked && styles.checked]}>
                                    {isChecked && <Text style={{color:'#FFF', fontSize: 10}}>✓</Text>}
                                </View>
                                <Text style={styles.rememberText}>Ghi nhớ tôi</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.forgotText}>Quên mật khẩu?</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Main Button */}
                        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                            <Text style={styles.loginBtnText}>Đăng nhập</Text>
                        </TouchableOpacity>

                        {/* Socials */}
                        <View style={styles.socialSection}>
                            <Text style={styles.orText}>Hoặc đăng nhập với</Text>
                            <View style={styles.socialRow}>
                                <TouchableOpacity style={styles.socialIcon}><FacebookIcon /></TouchableOpacity>
                                <TouchableOpacity style={styles.socialIcon}><GoogleIcon /></TouchableOpacity>
                            </View>
                            <View style={styles.footerRow}>
                                <Text style={styles.noAccount}>Chưa có tài khoản? </Text>
                                <TouchableOpacity><Text style={styles.signUpLink}>Đăng ký ngay</Text></TouchableOpacity>
                            </View>
                        </View>

                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0F172A' },

    headerContent: { marginTop: 40 },
    headerTitle: { fontSize: 28, fontWeight: 'bold', color: COLORS.white },
    headerSubtitle: { fontSize: 14, color: COLORS.primaryLight, marginTop: 5 },

    headerArea: { height: height * 0.35, justifyContent: 'center', paddingHorizontal: 20 },
    backBtn: { position: 'absolute', top: 50, left: 20, padding: 10, zIndex: 10 },
    backText: { color: COLORS.white, fontWeight: '600' },
    
    bottomSheet: {
        flex: 1,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 30,
        paddingTop: 40,
        marginTop: -30, // Overlap effect
    },
    scrollContent: { paddingBottom: 30 },
    title: { fontSize: 28, fontWeight: 'bold', color: '#1E293B', marginBottom: 30, textAlign: 'center' },
    
    formGroup: { marginBottom: 20 },
    label: { fontSize: 14, color: '#64748B', marginBottom: 8, fontWeight: '500' },
    input: {
        backgroundColor: '#F1F5F9', borderRadius: 12, paddingHorizontal: 15, height: 50,
        fontSize: 16, color: '#1E293B', borderWidth: 1, borderColor: '#E2E8F0'
    },
    
    rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
    checkboxRow: { flexDirection: 'row', alignItems: 'center' },
    checkbox: {
        width: 20, height: 20, borderRadius: 6, borderWidth: 1.5, borderColor: '#1E40AF',
        marginRight: 8, justifyContent: 'center', alignItems: 'center'
    },
    checked: { backgroundColor: '#1E40AF' },
    rememberText: { color: '#64748B' },
    forgotText: { color: '#1E40AF', fontWeight: '600' },
    
    loginBtn: {
        backgroundColor: '#1E40AF', height: 56, borderRadius: 16,
        justifyContent: 'center', alignItems: 'center', marginBottom: 30,
        shadowColor: "#1E40AF", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 5
    },
    loginBtnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    
    socialSection: { alignItems: 'center' },
    orText: { color: '#94A3B8', marginBottom: 20 },
    socialRow: { flexDirection: 'row', gap: 20, marginBottom: 30 },
    socialIcon: {
        width: 50, height: 50, borderRadius: 25, backgroundColor: '#FFF',
        justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0'
    },
    footerRow: { flexDirection: 'row' },
    noAccount: { color: '#64748B' },
    signUpLink: { color: '#1E40AF', fontWeight: 'bold' },
});

export default LoginScreen;