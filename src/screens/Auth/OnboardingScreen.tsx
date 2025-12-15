import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, Image, StatusBar } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import { RootStackParamList } from '../../types/navigation';
import { useAppStore } from '../../store/appStore';
import { COLORS } from '../../utils/theme';

const { width, height } = Dimensions.get('window');

const SLIDES = [
    {
        id: '1',
        title: 'Tìm Người Bạn\nMới Của Bạn',
        description: 'Kết nối với hàng ngàn thú cưng đang chờ đợi một mái ấm yêu thương.',
        image: 'https://cdn.dribbble.com/users/1233499/screenshots/15949272/media/9d63c462719875a6c38708c0282110c7.png?resize=800x600',
    },
    {
        id: '2',
        title: 'Cứu Hộ &\nBảo Vệ',
        description: 'Báo cáo thú cưng bị lạc và giúp chúng trở về nhà an toàn nhanh chóng.',
        image: 'https://cdn.dribbble.com/users/427857/screenshots/16645391/media/1d9520970725345758066b5956037a3f.png?resize=800x600',
    },
    {
        id: '3',
        title: 'Cộng Đồng\nYêu Thú Cưng',
        description: 'Chia sẻ khoảnh khắc và kinh nghiệm chăm sóc với cộng đồng.',
        image: 'https://cdn.dribbble.com/users/1233499/screenshots/3815944/media/3133642345688002636735234.png?resize=800x600',
    },
];

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'Onboarding'> };

const OnboardingScreen = ({ navigation }: Props) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);
    const completeOnboarding = useAppStore((state) => state.completeOnboarding);

    const handleNext = () => {
        if (currentIndex < SLIDES.length - 1) {
            flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
        } else {
            completeOnboarding();
            navigation.replace('Welcome');
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            
            <FlatList
                ref={flatListRef}
                data={SLIDES}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                onMomentumScrollEnd={(e) => setCurrentIndex(Math.round(e.nativeEvent.contentOffset.x / width))}
                renderItem={({ item }) => (
                    <View style={styles.slide}>
                        {/* Background Image Area - Top 60% */}
                        <View style={styles.imageContainer}>
                             <LinearGradient
                                colors={['#0A1B3D', '#4F46E5']}
                                style={StyleSheet.absoluteFill}
                            />
                            <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
                             {/* Gradient Overlay for seamless blend */}
                            <LinearGradient
                                colors={['transparent', '#020617']}
                                style={styles.gradientOverlay}
                            />
                        </View>

                        {/* Text Content - Bottom 40% */}
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.description}>{item.description}</Text>
                        </View>
                    </View>
                )}
            />

            {/* Footer Controls */}
            <View style={styles.footer}>
                <View style={styles.pagination}>
                    {SLIDES.map((_, index) => (
                        <View key={index} style={[styles.dot, currentIndex === index && styles.activeDot]} />
                    ))}
                </View>

                <TouchableOpacity style={styles.btn} onPress={handleNext}>
                    <Text style={styles.btnText}>
                        {currentIndex === SLIDES.length - 1 ? 'Bắt đầu' : 'Tiếp theo'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#020617' },
    slide: { width, height },
    imageContainer: { height: height * 0.65, width: '100%', justifyContent: 'flex-end' },
    image: { width: '100%', height: '80%', marginBottom: 20 },
    gradientOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 100 },
    textContainer: { flex: 1, paddingHorizontal: 30, paddingTop: 20 },
    title: { fontSize: 32, fontWeight: '800', color: COLORS.white, marginBottom: 15 },
    description: { fontSize: 16, color: COLORS.textSecondary, lineHeight: 24 },
    footer: { position: 'absolute', bottom: 50, left: 30, right: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    pagination: { flexDirection: 'row' },
    dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#334155', marginRight: 8 },
    activeDot: { backgroundColor: COLORS.primaryLight, width: 24 },
    btn: { backgroundColor: COLORS.primary, paddingVertical: 14, paddingHorizontal: 32, borderRadius: 30 },
    btnText: { color: COLORS.white, fontWeight: 'bold', fontSize: 16 },
});

export default OnboardingScreen;