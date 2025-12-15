import React, { useState } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, StatusBar, TextInput,
    Dimensions, KeyboardAvoidingView, Platform, ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Circle, Defs, LinearGradient as SvgLinearGradient, Stop, Path } from 'react-native-svg';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useAppStore } from '../../store/appStore';
import { COLORS } from '../../utils/theme';

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'SignUp'> };
const { width, height } = Dimensions.get('window');

// --- Icons ---
const BackIcon = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M15 18l-6-6 6-6" />
    </Svg>
);

const SignUpScreen = ({ navigation }: Props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    // Mock logic đăng ký
    const handleSignUp = () => {
        // Thực hiện validate và API call tại đây
        console.log("Registering:", name, email);
        // Sau khi thành công có thể navigate về Login hoặc vào Main
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            
            {/* 1. Header Area - Top 25% (Nhỏ hơn Login xíu để chừa chỗ cho form dài hơn) */}
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
                    <Circle cx={width * 0.8} cy="-20" r="120" fill="url(#grad)" />
                    <Circle cx="20" cy="50" r="40" fill="#2563EB" opacity="0.3" />
                </Svg>
                
                {/* Back Button */}
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <BackIcon />
                </TouchableOpacity>

                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>Tạo tài khoản</Text>
                    <Text style={styles.headerSubtitle}>Gia nhập cộng đồng thú cưng</Text>
                </View>
            </View>

            {/* 2. Bottom Sheet (White) - Bottom 75% */}
            <View style={styles.bottomSheet}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                        
                        {/* Forms */}
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Họ và tên</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập tên hiển thị"
                                placeholderTextColor="#94A3B8"
                                value={name}
                                onChangeText={setName}
                            />
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="name@example.com"
                                placeholderTextColor="#94A3B8"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Mật khẩu</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Tối thiểu 6 ký tự"
                                placeholderTextColor="#94A3B8"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Xác nhận mật khẩu</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập lại mật khẩu"
                                placeholderTextColor="#94A3B8"
                                secureTextEntry
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                            />
                        </View>

                        {/* Main Button */}
                        <TouchableOpacity style={styles.signUpBtn} onPress={handleSignUp}>
                            <Text style={styles.signUpBtnText}>Đăng ký ngay</Text>
                        </TouchableOpacity>

                        {/* Footer Link */}
                        <View style={styles.footerRow}>
                            <Text style={styles.hasAccount}>Đã có tài khoản? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text style={styles.loginLink}>Đăng nhập</Text>
                            </TouchableOpacity>
                        </View>

                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0F172A' },
    headerArea: { height: height * 0.35, justifyContent: 'center', paddingHorizontal: 30 },
    backBtn: { position: 'absolute', top: 50, left: 20, padding: 10, zIndex: 10 },
    
    headerContent: { marginTop: 40 },
    headerTitle: { fontSize: 28, fontWeight: 'bold', color: COLORS.white },
    headerSubtitle: { fontSize: 14, color: COLORS.primaryLight, marginTop: 5 },

    bottomSheet: {
        flex: 1,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 30,
        paddingTop: 40,
        marginTop: -20,
    },
    scrollContent: { paddingBottom: 30 },
    
    formGroup: { marginBottom: 20 },
    label: { fontSize: 14, color: '#64748B', marginBottom: 8, fontWeight: '500' },
    input: {
        backgroundColor: '#F1F5F9', borderRadius: 12, paddingHorizontal: 15, height: 50,
        fontSize: 16, color: '#1E293B', borderWidth: 1, borderColor: '#E2E8F0'
    },
    
    signUpBtn: {
        backgroundColor: '#1E40AF', height: 56, borderRadius: 16,
        justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 20,
        shadowColor: "#1E40AF", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 5
    },
    signUpBtnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    
    footerRow: { flexDirection: 'row', justifyContent: 'center' },
    hasAccount: { color: '#64748B' },
    loginLink: { color: '#1E40AF', fontWeight: 'bold' },
});

export default SignUpScreen;