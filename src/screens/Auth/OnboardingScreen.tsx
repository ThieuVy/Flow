import React, { useState, useRef } from 'react';
import { 
    View, Text, StyleSheet, FlatList, Dimensions, 
    TouchableOpacity, Image, StatusBar 
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useAppStore } from '../../store/appStore';
import { COLORS, SIZES } from '../../utils/theme';

const { width, height } = Dimensions.get('window');

const SLIDES = [
    {
        id: '1',
        title: 'Nhận nuôi thú cưng dễ dàng',
        description: 'Tìm kiếm, kết nối và đón thú cưng về nhà nhanh chóng và an toàn.',
        image: 'https://cdn.dribbble.com/users/1233499/screenshots/15949272/media/9d63c462719875a6c38708c0282110c7.png?resize=800x600&vertical=center', 
    },
    {
        id: '2',
        title: 'Báo cáo cứu hộ \nnhanh chóng',
        description: 'Giúp đỡ thú cưng bị lạc hoặc gặp nạn chỉ với vài thao tác đơn giản.',
        image: 'https://cdn.dribbble.com/users/427857/screenshots/16645391/media/1d9520970725345758066b5956037a3f.png?resize=800x600&vertical=center',
    },
    {
        id: '3',
        title: 'Cộng đồng \nyêu thương',
        description: 'Kết nối với hàng ngàn người yêu động vật và các trạm cứu hộ uy tín.',
        image: 'https://cdn.dribbble.com/users/1233499/screenshots/3815944/media/3133642345688002636735234.png?resize=800x600&vertical=center',
    },
];

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;
};

const OnboardingScreen = ({ navigation }: Props) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);
    const completeOnboarding = useAppStore((state) => state.completeOnboarding);

    const handleNext = () => {
        if (currentIndex < SLIDES.length - 1) {
            flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
        } else {
            completeOnboarding();
            navigation.replace('Login');
        }
    };

    const handleSkip = () => {
        completeOnboarding();
        navigation.replace('Login');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
            
            {/* Header: Skip Button */}
            <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
                <Text style={styles.skipText}>Bỏ qua</Text>
            </TouchableOpacity>

            {/* Main Card Area */}
            <View style={styles.cardContainer}>
                <FlatList
                    ref={flatListRef}
                    data={SLIDES}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    onMomentumScrollEnd={(event) => {
                        const index = Math.round(event.nativeEvent.contentOffset.x / width);
                        setCurrentIndex(index);
                    }}
                    renderItem={({ item }) => (
                        <View style={styles.slide}>
                            <View style={styles.cardContent}>
                                {/* Image Area */}
                                <View style={styles.imageWrapper}>
                                    <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
                                </View>
                                
                                {/* Text Area */}
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.description}>{item.description}</Text>
                            </View>
                        </View>
                    )}
                />
                
                {/* Dots & Button inside Card Logic (Visual trick: dots outside card, button outside card but aligned) */}
            </View>

            {/* Footer Control */}
            <View style={styles.footer}>
                {/* Dots */}
                <View style={styles.dotsContainer}>
                    {SLIDES.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                currentIndex === index ? styles.activeDot : styles.inactiveDot
                            ]}
                        />
                    ))}
                </View>

                {/* Big Green Button */}
                <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
                    <Text style={styles.nextBtnText}>
                        {currentIndex === SLIDES.length - 1 ? 'Bắt đầu ngay' : 'Tiếp tục'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: COLORS.background, // Deep Navy Background
    },
    skipBtn: {
        position: 'absolute',
        top: 50,
        right: 20,
        zIndex: 10,
        padding: 10,
    },
    skipText: {
        color: COLORS.primary, // Green text
        fontWeight: 'bold',
        fontSize: 16,
    },
    cardContainer: {
        flex: 1,
        marginTop: 100,
        marginBottom: 150, // Space for footer
    },
    slide: { 
        width: width, 
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    cardContent: {
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.cardBg, // Beige Card
        borderRadius: 40, // Bo góc rất lớn như ảnh
        alignItems: 'center',
        padding: 20,
        justifyContent: 'center',
    },
    imageWrapper: {
        width: 250,
        height: 250,
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: { 
        width: '100%', 
        height: '100%',
    },
    title: { 
        fontSize: 26, 
        fontWeight: '800', 
        color: COLORS.textMain, 
        textAlign: 'center',
        marginBottom: 15,
        lineHeight: 34,
    },
    description: { 
        fontSize: 15, 
        color: '#64748B', 
        textAlign: 'center',
        lineHeight: 22,
        paddingHorizontal: 10,
    },
    footer: {
        position: 'absolute',
        bottom: 40,
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    dotsContainer: { 
        flexDirection: 'row', 
        marginBottom: 25 
    },
    dot: { 
        height: 8, 
        width: 8, 
        borderRadius: 4, 
        marginHorizontal: 5 
    },
    activeDot: { 
        backgroundColor: COLORS.primary, // Bright Green
        width: 24 
    },
    inactiveDot: { 
        backgroundColor: '#334155' 
    },
    nextBtn: {
        backgroundColor: COLORS.primary, // Bright Green Button
        width: '100%',
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: 'center',
        elevation: 5,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    nextBtnText: {
        color: '#000000', // Chữ đen trên nền xanh lá
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default OnboardingScreen;