import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, StatusBar } from 'react-native';
import { COLORS } from '../../utils/theme';
import { useAppStore } from '../../store/appStore';
import Svg, { Path, Circle } from 'react-native-svg';

const TABS = ['Tất cả', 'Chó', 'Mèo', 'Chim'];

export default function HomeScreen() {
    const user = useAppStore(state => state.user);
    const [activeTab, setActiveTab] = useState('Tất cả');

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

            {/* 1. Header: Avatar + Welcome + Bell */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <View style={styles.avatarContainer}>
                        <Text style={styles.avatarText}>{user?.email?.[0].toUpperCase() || 'U'}</Text>
                    </View>
                    <View>
                        <Text style={styles.welcomeText}>Welcome home,</Text>
                        <Text style={styles.userName}>{user?.email?.split('@')[0] || 'User'}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.bellBtn}>
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={COLORS.primaryLight} strokeWidth="2"><Path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><Path d="M13.73 21a2 2 0 0 1-3.46 0" /></Svg>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                {/* 2. Horizontal Tabs (Living room, Kitchen...) */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabScroll}>
                    {TABS.map((tab) => (
                        <TouchableOpacity 
                            key={tab} 
                            style={styles.tabItem} 
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text style={[
                                styles.tabText, 
                                activeTab === tab && styles.activeTabText
                            ]}>{tab}</Text>
                            {activeTab === tab && <View style={styles.activeDot} />}
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* 3. Status Cards (Energy/Temp equivalent) */}
                <View style={styles.statusRow}>
                    <View style={styles.statusCard}>
                        <View style={[styles.iconBox, { backgroundColor: '#4F46E530' }]}>
                             <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.primaryLight} strokeWidth="2"><Path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></Svg>
                        </View>
                        <View>
                            <Text style={styles.statusLabel}>Thú cưng mới</Text>
                            <Text style={styles.statusValue}>152 <Text style={styles.unit}>bé</Text></Text>
                        </View>
                    </View>
                    <View style={styles.statusCard}>
                        <View style={[styles.iconBox, { backgroundColor: '#F472B630' }]}>
                            <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F472B6" strokeWidth="2"><Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></Svg>
                        </View>
                        <View>
                            <Text style={styles.statusLabel}>Đã nhận nuôi</Text>
                            <Text style={styles.statusValue}>24 <Text style={styles.unit}>bé</Text></Text>
                        </View>
                    </View>
                </View>

                {/* 4. Devices / Featured Pets */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Nổi bật</Text>
                    <TouchableOpacity><Text style={styles.seeAll}>Xem tất cả</Text></TouchableOpacity>
                </View>

                <View style={styles.gridContainer}>
                    {/* Card 1 */}
                    <View style={styles.petCard}>
                        <Image source={{ uri: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1' }} style={styles.petImage} resizeMode="cover" />
                        <Text style={styles.petName}>Golden Retriever</Text>
                        <Text style={styles.petStatus}>Đang chờ • 2 tuổi</Text>
                        <View style={styles.statusToggle}>
                            <View style={styles.toggleActive} />
                        </View>
                    </View>
                     {/* Card 2 */}
                     <View style={styles.petCard}>
                        <Image source={{ uri: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba' }} style={styles.petImage} resizeMode="cover" />
                        <Text style={styles.petName}>Mèo Anh</Text>
                        <Text style={styles.petStatus}>Sức khỏe tốt • 6 tháng</Text>
                        <View style={styles.statusToggle}>
                             <View style={[styles.toggleActive, { backgroundColor: COLORS.success }]} />
                        </View>
                    </View>
                </View>
                
                {/* Connect Device Banner Style */}
                <View style={styles.connectCard}>
                    <View>
                        <Text style={styles.connectTitle}>Gửi yêu cầu cứu hộ</Text>
                        <Text style={styles.connectSub}>Gửi thông tin thú cưng cần giúp đỡ</Text>
                    </View>
                    <View style={styles.plusBtn}>
                        <Text style={{color: '#FFF', fontSize: 20}}>+</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 24, paddingTop: 50 },
    
    // Header
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
    headerLeft: { flexDirection: 'row', alignItems: 'center' },
    avatarContainer: { width: 50, height: 50, borderRadius: 25, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center', marginRight: 15, borderWidth: 1, borderColor: COLORS.border },
    avatarText: { fontSize: 20, color: COLORS.white, fontWeight: 'bold' },
    welcomeText: { color: COLORS.textSecondary, fontSize: 14 },
    userName: { color: COLORS.white, fontSize: 20, fontWeight: 'bold' },
    bellBtn: { width: 40, height: 40, backgroundColor: COLORS.surface, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },

    // Tabs
    tabScroll: { marginBottom: 25, flexGrow: 0 },
    tabItem: { marginRight: 30, alignItems: 'center' },
    tabText: { fontSize: 16, color: COLORS.textSecondary, marginBottom: 5 },
    activeTabText: { color: COLORS.white, fontWeight: 'bold' },
    activeDot: { width: 20, height: 3, backgroundColor: COLORS.primaryLight, borderRadius: 2 },

    // Status Cards
    statusRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
    statusCard: { width: '48%', backgroundColor: COLORS.surface, borderRadius: 20, padding: 15, flexDirection: 'row', alignItems: 'center' },
    iconBox: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    statusLabel: { color: COLORS.textSecondary, fontSize: 12, marginBottom: 4 },
    statusValue: { color: COLORS.white, fontSize: 20, fontWeight: 'bold' },
    unit: { fontSize: 12, color: COLORS.textSecondary, fontWeight: 'normal' },

    // Featured
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFF' },
    seeAll: { color: COLORS.primaryLight },

    gridContainer: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' },
    petCard: { width: '48%', backgroundColor: COLORS.surface, borderRadius: 24, padding: 12, marginBottom: 15, alignItems: 'center' },
    petImage: { width: '100%', height: 120, borderRadius: 16, marginBottom: 12 },
    petName: { color: COLORS.white, fontSize: 16, fontWeight: 'bold', alignSelf: 'flex-start' },
    petStatus: { color: COLORS.textSecondary, fontSize: 12, marginTop: 4, alignSelf: 'flex-start', marginBottom: 10 },
    statusToggle: { width: 30, height: 16, borderRadius: 10, backgroundColor: '#1E293B', alignSelf: 'flex-end', justifyContent: 'center', paddingHorizontal: 2 },
    toggleActive: { width: 12, height: 12, borderRadius: 6, backgroundColor: COLORS.success, alignSelf: 'flex-end' },

    // Connect Banner
    connectCard: { backgroundColor: COLORS.surface, borderRadius: 24, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
    connectTitle: { color: COLORS.primaryLight, fontSize: 16, fontWeight: 'bold' },
    connectSub: { color: COLORS.textSecondary, fontSize: 12, marginTop: 4 },
    plusBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
});