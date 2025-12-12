import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, StatusBar, Dimensions } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useAppStore } from '../../store/appStore';
import { COLORS } from '../../utils/theme';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Splash'>;
};

const { width } = Dimensions.get('window');

const SplashScreen = ({ navigation }: Props) => {
  const checkFirstLaunch = useAppStore((state) => state.checkFirstLaunch);
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const init = async () => {
      await checkFirstLaunch();
      const isFirst = useAppStore.getState().isFirstLaunch;
      
      // Animation thanh loading chạy trong 2.5s
      Animated.timing(progress, {
        toValue: width - 100, // Chiều dài thanh loading
        duration: 2500,
        useNativeDriver: false,
      }).start(() => {
        navigation.replace(isFirst ? 'Onboarding' : 'Login');
      });
    };
    init();
  }, [navigation, checkFirstLaunch]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      
      {/* Logo Area */}
      <View style={styles.centerContent}>
        <View style={styles.iconCircle}>
          <Text style={styles.pawIcon}>🐾</Text>
          <Text style={styles.waveIcon}>≈≈≈</Text>
        </View>
        <Text style={styles.logoText}>FLOW</Text>
        <View style={styles.underline} />
      </View>
      
      {/* Bottom Loading & Slogan */}
      <View style={styles.bottomArea}>
        <Text style={styles.slogan}>CONNECT. RESCUE. ADOPT.</Text>
        <View style={styles.progressBarBackground}>
          <Animated.View 
            style={[
              styles.progressBarFill, 
              { width: progress }
            ]} 
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background, // Deep Navy
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 50,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#334155',
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  pawIcon: {
    fontSize: 40,
    color: COLORS.primary, // Teal Green
  },
  waveIcon: {
    fontSize: 20,
    color: '#FFFFFF',
    position: 'absolute',
    bottom: 15,
    right: 15,
    fontWeight: '900'
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  underline: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.primary,
    marginTop: 10,
    borderRadius: 2,
  },
  bottomArea: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 30,
  },
  slogan: {
    color: '#94A3B8',
    fontSize: 12,
    letterSpacing: 2,
    marginBottom: 20,
    fontWeight: '600',
  },
  progressBarBackground: {
    height: 6,
    width: width - 100,
    backgroundColor: '#1E293B',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary, // Green bar
    borderRadius: 3,
  }
});

export default SplashScreen;