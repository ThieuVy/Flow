import React, { useState } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, StatusBar,
    TextInput, Dimensions, Alert, KeyboardAvoidingView, Platform, ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path, Defs, Stop, LinearGradient as SvgLinearGradient, G, Circle } from 'react-native-svg';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useAppStore } from '../../store/appStore'; // Import Store để lưu trạng thái

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

const { width, height } = Dimensions.get('window');

// --- SVG COMPONENTS (Icon biểu tượng) ---
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

const EyeIcon = ({ visible }: { visible: boolean }) => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {visible ? (
            <>
                <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <Circle cx="12" cy="12" r="3" />
            </>
        ) : (
            <>
                <Path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <Path d="M1 1l22 22" />
            </>
        )}
    </Svg>
);

const LoginScreen = ({ navigation }: Props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    
    // Lấy hàm cập nhật trạng thái đã xong Onboarding
    const completeOnboarding = useAppStore((state) => state.completeOnboarding);

    const handleLogin = (type: string) => {
        // Logic: Hệ thống tự động liên kết (Giả lập)
        console.log(`Đang đăng nhập bằng: ${type}`);
        
        // 1. Thực hiện logic API login ở đây...
        // 2. Nếu thành công:
        completeOnboarding(); // Đánh dấu đã login/đã xong onboard
        
        // Điều hướng vào App chính (Ví dụ Main, hoặc Home)
        // Hiện tại code navigation chưa có Main, ta tạm alert
        Alert.alert("Thành công", `Đăng nhập ${type} thành công!`, [
             { text: "OK", onPress: () => console.log("Navigating to Main...") } // navigation.navigate('Main')
        ]);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

            {/* Background Gradient & Pattern */}
            <LinearGradient
                colors={['#FDEFF9', '#EC38BC', '#7303C0', '#03001E']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                locations={[0, 0.3, 0.6, 1]}
                style={StyleSheet.absoluteFillObject}
            >
               {/* Lớp phủ màu trắng mờ bên trên để tạo hiệu ứng nhạt như hình */}
               <LinearGradient 
                    colors={['#FFFFFF', 'rgba(255,255,255,0.8)', 'rgba(255,255,255,0)']}
                    style={StyleSheet.absoluteFillObject}
               />
            </LinearGradient>

            {/* Trang trí vòng tròn mờ trên cùng */}
            <View style={styles.topDecoration}>
                 <Svg height="300" width={width} viewBox={`0 0 ${width} 300`}>
                    <Defs>
                        <SvgLinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                            <Stop offset="0" stopColor="#E0C3FC" stopOpacity="0.3" />
                            <Stop offset="1" stopColor="#8EC5FC" stopOpacity="0" />
                        </SvgLinearGradient>
                    </Defs>
                    <Circle cx={width / 2} cy="-50" r={width / 1.2} fill="url(#grad)" />
                 </Svg>
            </View>

            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    
                    {/* Header Text */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Welcome Back</Text>
                        <Text style={styles.subtitle}>
                            Ready to continue your learning journey?{'\n'}
                            Your path is right here.
                        </Text>
                    </View>

                    {/* Form Input */}
                    <View style={styles.formContainer}>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter email"
                                placeholderTextColor="#94A3B8"
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                placeholderTextColor="#94A3B8"
                                secureTextEntry={!isPasswordVisible}
                                value={password}
                                onChangeText={setPassword}
                            />
                            <TouchableOpacity 
                                style={styles.eyeBtn}
                                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                            >
                                <EyeIcon visible={isPasswordVisible} />
                            </TouchableOpacity>
                        </View>

                        {/* Remember Me & Forgot Password */}
                        <View style={styles.optionRow}>
                            <TouchableOpacity 
                                style={styles.checkboxContainer}
                                onPress={() => setIsChecked(!isChecked)}
                            >
                                <View style={[styles.checkbox, isChecked && styles.checked]}>
                                    {isChecked && <View style={styles.innerCheck} />}
                                </View>
                                <Text style={styles.rememberText}>Remember me</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity>
                                <Text style={styles.forgotText}>Forgot password?</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Login Button Gradient */}
                        <TouchableOpacity onPress={() => handleLogin('Email/Pass')} style={styles.loginBtnShadow}>
                            <LinearGradient
                                colors={['#FBC2EB', '#A6C1EE']} // Màu Gradient tím hồng nhạt
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.loginBtn}
                            >
                                <Text style={styles.loginBtnText}>Log In</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        {/* Social Login Divider */}
                        <View style={styles.dividerContainer}>
                            <View style={styles.line} />
                            <Text style={styles.orText}>Sign in with</Text>
                            <View style={styles.line} />
                        </View>

                        {/* Social Icons */}
                        <View style={styles.socialRow}>
                            <TouchableOpacity style={styles.socialBtn} onPress={() => handleLogin('Facebook')}>
                                <FacebookIcon />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialBtn} onPress={() => handleLogin('Google')}>
                                <GoogleIcon />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialBtn} onPress={() => handleLogin('Apple')}>
                                <AppleIcon />
                            </TouchableOpacity>
                        </View>

                        {/* Sign Up Link */}
                        <View style={styles.footerRow}>
                            <Text style={styles.noAccountText}>Don't have an account? </Text>
                            <TouchableOpacity>
                                <Text style={styles.signupText}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    topDecoration: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
        paddingTop: 100,
        paddingBottom: 30,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1E293B',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
        color: '#64748B',
        textAlign: 'center',
        lineHeight: 20,
    },
    formContainer: {
        width: '100%',
    },
    inputWrapper: {
        marginBottom: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        height: 56,
        // Shadow effect
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#1E293B',
    },
    eyeBtn: {
        padding: 5,
    },
    optionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 6,
        borderWidth: 1.5,
        borderColor: '#94A3B8',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    checked: {
        borderColor: '#7303C0',
        backgroundColor: '#7303C0',
    },
    innerCheck: {
        width: 10,
        height: 10,
        backgroundColor: '#FFF',
        borderRadius: 2,
    },
    rememberText: {
        color: '#64748B',
        fontSize: 14,
    },
    forgotText: {
        color: '#7303C0', // Purple link
        fontSize: 14,
        fontWeight: '600',
    },
    loginBtnShadow: {
        shadowColor: "#FBC2EB",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 10,
        marginBottom: 40,
    },
    loginBtn: {
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginBtnText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#E2E8F0',
    },
    orText: {
        marginHorizontal: 15,
        color: '#94A3B8',
        fontSize: 14,
    },
    socialRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        marginBottom: 40,
    },
    socialBtn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        // Shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    noAccountText: {
        color: '#64748B',
        fontSize: 14,
    },
    signupText: {
        color: '#7303C0',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default LoginScreen;