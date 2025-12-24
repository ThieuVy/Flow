import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, StatusBar, Dimensions, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';
import { RootStackParamList } from '../../types/navigation';
import { useAppStore } from '../../store/appStore';
import { COLORS } from '../../utils/theme';
import LogoApp from '../../assets/images/logo.png';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Splash'>;
};

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }: Props) => {
  const checkFirstLaunch = useAppStore((state) => state.checkFirstLaunch);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    const init = async () => {
      await checkFirstLaunch();
      const isFirst = useAppStore.getState().isFirstLaunch;

      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
        Animated.spring(scaleAnim, { toValue: 1, friction: 6, useNativeDriver: true }),
      ]).start(() => {
        setTimeout(() => {
          navigation.replace(isFirst ? 'Onboarding' : 'Welcome');
        }, 1500);
      });
    };
    init();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Background Gradient */}
      <LinearGradient
        colors={['#0A1B3D', '#1E40AF', '#4F46E5']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Decorative Spheres */}
      <View style={StyleSheet.absoluteFill}>
        <Svg height={height} width={width}>
          <Defs>
            <RadialGradient id="grad" cx="50%" cy="50%" rx="50%" ry="50%">
              <Stop offset="0" stopColor="#60A5FA" stopOpacity="0.3" />
              <Stop offset="1" stopColor="#1E40AF" stopOpacity="0" />
            </RadialGradient>
          </Defs>
          <Circle cx={width * 0.2} cy={height * 0.2} r={100} fill="url(#grad)" />
          <Circle cx={width * 0.8} cy={height * 0.8} r={150} fill="url(#grad)" />
        </Svg>
      </View>

      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.logoContainer}>
            <Image source={LogoApp} style={styles.logo} resizeMode="center" />
        </View>
        <Text style={styles.appName}>FLOW</Text>
        <Text style={styles.tagline}>Yêu thương & Gắn kết</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  content: { alignItems: 'center' },
  logoContainer: {
    width: 120, height: 120, borderRadius: 30, backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center', alignItems: 'center', marginBottom: 20,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)'
  },
  logo: { width: 90, height: 90, borderRadius: 20 },
  appName: { fontSize: 28, fontWeight: '800', color: COLORS.white, letterSpacing: 2 },
  tagline: { marginTop: 8, fontSize: 14, color: COLORS.primaryLight, letterSpacing: 1 },
});

export default SplashScreen;