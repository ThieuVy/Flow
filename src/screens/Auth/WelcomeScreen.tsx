import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Circle, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { COLORS } from '../../utils/theme';

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'Welcome'> };
const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }: Props) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            {/* Background & Decoration */}
            <LinearGradient
                colors={['#0F172A', '#1E40AF', '#60A5FA']}
                locations={[0, 0.6, 1]}
                style={StyleSheet.absoluteFill}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />
            <View style={StyleSheet.absoluteFill}>
                <Svg height={height} width={width}>
                    <Defs>
                        <SvgLinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                            <Stop offset="0" stopColor="#FFF" stopOpacity="0.2" />
                            <Stop offset="1" stopColor="#FFF" stopOpacity="0" />
                        </SvgLinearGradient>
                    </Defs>
                    <Circle cx="-50" cy="100" r="180" fill="url(#grad)" />
                    <Circle cx={width} cy={height * 0.4} r="120" fill="url(#grad)" />
                    <Circle cx="50" cy={height * 0.8} r="80" fill="#2563EB" opacity="0.5" />
                </Svg>
            </View>

            {/* Content */}
            <View style={styles.contentContainer}>
                <View style={styles.textWrapper}>
                    <Text style={styles.title}>Welcome Back!</Text>
                    <Text style={styles.subtitle}>
                        Kết nối với thế giới thú cưng.{'\n'}
                        Hành trình yêu thương bắt đầu tại đây.
                    </Text>
                </View>

                {/* Bottom Buttons */}
                <View style={styles.bottomRow}>
                    <TouchableOpacity style={styles.signInBtn} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.signInText}>Đăng nhập</Text>
                    </TouchableOpacity>
                    
                    {/* Cập nhật sự kiện onPress cho nút Đăng ký */}
                    <TouchableOpacity style={styles.signUpBtn} onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.signUpText}>Đăng ký</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    contentContainer: { flex: 1, justifyContent: 'space-between', paddingHorizontal: 30, paddingVertical: 60 },
    textWrapper: { marginTop: 100 },
    title: { fontSize: 36, fontWeight: '800', color: COLORS.white, marginBottom: 10 },
    subtitle: { fontSize: 16, color: '#E2E8F0', lineHeight: 24 },
    bottomRow: { 
        flexDirection: 'row', 
        height: 60,
        backgroundColor: '#0F172A',
        borderRadius: 30,
        padding: 4,
    },
    signInBtn: { flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 26 },
    signInText: { color: COLORS.white, fontWeight: 'bold', fontSize: 16 },
    signUpBtn: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: 26 },
    signUpText: { color: '#0F172A', fontWeight: 'bold', fontSize: 16 },
});

export default WelcomeScreen;