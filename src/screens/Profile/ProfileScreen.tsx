import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { COLORS } from '../../utils/theme';
import Svg, { Path, Circle } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useAppStore } from '../../store/appStore';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

const { width } = Dimensions.get('window');

// Định nghĩa kiểu dữ liệu cho User
interface UserData {
    displayName?: string;
    avatar?: string;
    points?: number;
    sosSent?: number;
    donatedAmount?: number;
    createdAt?: FirebaseFirestoreTypes.Timestamp; 
}

// --- Icons ---
const SettingsIcon = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={COLORS.white} strokeWidth="2">
        <Path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
        <Path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
    </Svg>
);

const EditIcon = () => (
    <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={COLORS.white} strokeWidth="3">
        <Path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
    </Svg>
);

const LocationIcon = () => (
    <Svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={COLORS.textSecondary} strokeWidth="2">
        <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <Circle cx="12" cy="10" r="3" />
    </Svg>
);

export default function ProfileScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const userAuth = useAppStore(state => state.user);
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        if (userAuth?.uid) {
            const unsubscribe = firestore()
                .collection('users')
                .doc(userAuth.uid)
                .onSnapshot(doc => {
                    const data = doc.data();
                    if (data) {
                        setUserData(data as UserData);
                    }
                });
            return () => unsubscribe();
        }
    }, [userAuth]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount || 0);
    };

    const getJoinDate = () => {
        // Chỉ cần check sự tồn tại của createdAt, TS sẽ hiểu nó có method .toDate()
        if (userData?.createdAt) {
            const date = userData.createdAt.toDate();
            return `Thành viên từ tháng ${date.getMonth() + 1}, ${date.getFullYear()}`;
        }
        return 'Thành viên mới';
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerNav}>
                <View /> 
                <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                    <SettingsIcon />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
                {/* Profile Info */}
                <View style={styles.profileSection}>
                    <View style={styles.avatarWrapper}>
                        <Image 
                            source={{ uri: userData?.avatar || 'https://i.pravatar.cc/150' }} 
                            style={styles.avatar} 
                        />
                        <TouchableOpacity style={styles.editBadge} onPress={() => navigation.navigate('EditProfile')}>
                            <EditIcon />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.userName}>
                        {userData?.displayName || userAuth?.email?.split('@')[0] || 'Người dùng'}
                    </Text>
                    <Text style={styles.memberSince}>{getJoinDate()}</Text>
                </View>

                {/* Badges */}
                <View style={styles.badgeRow}>
                    <View style={[styles.badge, { backgroundColor: '#FACC1520' }]}>
                        <Text style={[styles.badgeText, { color: COLORS.warning }]}>🏆 TOP CỨU HỘ</Text>
                    </View>
                    <View style={[styles.badge, { backgroundColor: '#60A5FA20' }]}>
                        <Text style={[styles.badgeText, { color: COLORS.primaryLight }]}>🛡️ NGƯỜI BẢO VỆ</Text>
                    </View>
                    <View style={[styles.badge, { backgroundColor: '#EF444420' }]}>
                        <Text style={[styles.badgeText, { color: COLORS.danger }]}>❤️ NHÀ HẢO TÂM</Text>
                    </View>
                </View>

                {/* Stats */}
                <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                        <Text style={[styles.statValue, { color: COLORS.success }]}>
                            {userData?.points || 0}
                        </Text>
                        <Text style={styles.statLabel}>ĐIỂM</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>
                            {userData?.sosSent || 0}
                        </Text>
                        <Text style={styles.statLabel}>SOS ĐÃ GỬI</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>
                            {formatCurrency(userData?.donatedAmount || 0).split(',00')[0]}
                        </Text>
                        <Text style={styles.statLabel}>QUYÊN GÓP</Text>
                    </View>
                </View>

                {/* Tabs */}
                <View style={styles.tabHeader}>
                    <TouchableOpacity style={[styles.tabItem, styles.activeTab]}>
                        <Text style={[styles.tabText, styles.activeTabText]}>Hoạt động</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabItem}>
                        <Text style={styles.tabText}>Yêu thích</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabItem}>
                        <Text style={styles.tabText}>Lịch sử</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.timelineContainer}>
                    <ActivityCard 
                        title="Tìm thấy Golden Retriever"
                        time="2 giờ trước"
                        desc="Phát hiện bé đang lang thang gần Công viên. Trông bé rất hiền lành nhưng có vẻ bị lạc."
                        status="Đã vào trạm"
                        location="Hà Nội"
                    />
                    <ActivityCard 
                        title="Báo cáo mèo bị thương"
                        time="Hôm qua"
                        desc="Mèo mướp bị đau chân sau trong hẻm nhỏ đường Lê Lợi."
                        status="Đội cứu hộ đang đến"
                        location="TP. Hồ Chí Minh"
                        isEmergency
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const ActivityCard = ({ title, time, desc, status, location, isEmergency }: any) => (
    <View style={styles.cardWrapper}>
        <View style={styles.timelineLine} />
        <View style={[styles.dot, { backgroundColor: isEmergency ? COLORS.warning : COLORS.success }]} />
        <View style={styles.activityCard}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardTime}>{time}</Text>
            </View>
            <Text style={styles.cardDesc}>{desc}</Text>
            <View style={styles.tagRow}>
                <View style={[styles.statusTag, { backgroundColor: isEmergency ? COLORS.warning + '20' : COLORS.success + '20' }]}>
                    <Text style={[styles.tagText, { color: isEmergency ? COLORS.warning : COLORS.success }]}>● {status}</Text>
                </View>
                <View style={styles.locationTag}>
                    <LocationIcon />
                    <Text style={[styles.tagText, { marginLeft: 4 }]}>{location}</Text>
                </View>
            </View>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background, paddingTop: 50 },
    headerNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, marginBottom: 25 },
    profileSection: { alignItems: 'center', marginBottom: 20 },
    avatarWrapper: { position: 'relative' },
    avatar: { width: 110, height: 110, borderRadius: 55, borderWidth: 3, borderColor: COLORS.success },
    editBadge: { position: 'absolute', bottom: 5, right: 5, backgroundColor: COLORS.success, padding: 8, borderRadius: 20, borderWidth: 3, borderColor: COLORS.background },
    userName: { color: COLORS.white, fontSize: 26, fontWeight: 'bold', marginTop: 15 },
    memberSince: { color: COLORS.textSecondary, fontSize: 14, marginTop: 4 },
    badgeRow: { flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 30 },
    badge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
    badgeText: { fontSize: 10, fontWeight: 'bold' },
    statsRow: { flexDirection: 'row', backgroundColor: COLORS.surface, marginHorizontal: 20, paddingVertical: 20, borderRadius: 24, justifyContent: 'space-evenly', alignItems: 'center' },
    statItem: { alignItems: 'center', flex: 1 },
    statDivider: { width: 1, height: 30, backgroundColor: COLORS.border },
    statValue: { color: COLORS.white, fontSize: 18, fontWeight: 'bold' },
    statLabel: { color: COLORS.textSecondary, fontSize: 10, marginTop: 4, fontWeight: '600' },
    tabHeader: { flexDirection: 'row', paddingHorizontal: 20, marginTop: 30, borderBottomWidth: 1, borderBottomColor: COLORS.border },
    tabItem: { paddingBottom: 12, marginRight: 30 },
    activeTab: { borderBottomWidth: 3, borderBottomColor: COLORS.success },
    tabText: { color: COLORS.textSecondary, fontSize: 16, fontWeight: '600' },
    activeTabText: { color: COLORS.success },
    timelineContainer: { padding: 20 },
    cardWrapper: { flexDirection: 'row', marginBottom: 25 },
    timelineLine: { position: 'absolute', left: 7, top: 20, bottom: -30, width: 2, backgroundColor: COLORS.border },
    dot: { width: 16, height: 16, borderRadius: 8, marginTop: 4, zIndex: 1, borderWidth: 3, borderColor: COLORS.background },
    activityCard: { flex: 1, backgroundColor: COLORS.surface, marginLeft: 15, padding: 16, borderRadius: 20 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    cardTitle: { color: COLORS.white, fontWeight: 'bold', fontSize: 15, flex: 1 },
    cardTime: { color: COLORS.textSecondary, fontSize: 11 },
    cardDesc: { color: '#CBD5E1', fontSize: 13, lineHeight: 18 },
    tagRow: { flexDirection: 'row', gap: 10, marginTop: 15 },
    statusTag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
    locationTag: { backgroundColor: COLORS.border, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, flexDirection: 'row', alignItems: 'center' },
    tagText: { fontSize: 11, fontWeight: '600', color: COLORS.textSecondary }
});