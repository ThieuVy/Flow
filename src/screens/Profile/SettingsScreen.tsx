import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView, Alert } from 'react-native';
import { COLORS } from '../../utils/theme';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { useAppStore } from '../../store/appStore';
import { signOut } from '../../api/firebaseAuth';

export default function SettingsScreen() {
    const navigation = useNavigation<any>();
    const logoutStore = useAppStore(state => state.logout);
    const [pushNotif, setPushNotif] = useState(true);
    const [emailUpdates, setEmailUpdates] = useState(false);
    const [petAlerts, setPetAlerts] = useState(true);

    const handleLogout = () => {
        Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn thoát không?", [
            { text: "Hủy", style: "cancel" },
            { text: "Đăng xuất", style: "destructive", onPress: async () => {
                await signOut();
                logoutStore();
            }}
        ]);
    };

    const SettingItem = ({ label, icon, rightElement, onPress, isLast }: any) => (
        <TouchableOpacity 
            style={[styles.item, isLast && { borderBottomWidth: 0 }]} 
            onPress={onPress}
            disabled={!onPress}
        >
            <View style={styles.itemLeft}>
                <View style={styles.iconBox}>{icon}</View>
                <Text style={styles.itemLabel}>{label}</Text>
            </View>
            {rightElement ? rightElement : (
                <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.textSecondary} strokeWidth="2">
                    <Path d="M9 18l6-6-6-6" />
                </Svg>
            )}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={COLORS.white} strokeWidth="2">
                        <Path d="M15 18l-6-6 6-6" />
                    </Svg>
                </TouchableOpacity>
                <Text style={styles.title}>Cài đặt</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Section: Personal */}
                <Text style={styles.sectionTitle}>THÔNG TIN CÁ NHÂN</Text>
                <View style={styles.card}>
                    <SettingItem 
                        label="Chỉnh sửa hồ sơ" 
                        onPress={() => navigation.navigate('EditProfile')}
                        icon={<Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.success} strokeWidth="2"><Circle cx="12" cy="7" r="4"/><Path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/></Svg>}
                    />
                    <SettingItem 
                        label="Thay đổi mật khẩu" 
                        isLast
                        icon={<Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.success} strokeWidth="2"><Rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><Path d="M7 11V7a5 5 0 0110 0v4"/></Svg>}
                    />
                </View>

                {/* Section: Preferences */}
                <Text style={styles.sectionTitle}>TÙY CHỌN</Text>
                <View style={styles.card}>
                    <SettingItem 
                        label="Ngôn ngữ" 
                        icon={<Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.success} strokeWidth="2"><Circle cx="12" cy="12" r="10"/><Path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></Svg>}
                        rightElement={
                            <View style={styles.langSwitch}>
                                <TouchableOpacity style={styles.langActive}><Text style={styles.langText}>VI</Text></TouchableOpacity>
                                <TouchableOpacity style={{paddingHorizontal: 10}}><Text style={[styles.langText, {color: COLORS.textSecondary}]}>EN</Text></TouchableOpacity>
                            </View>
                        }
                    />
                    <SettingItem 
                        label="Thông báo đẩy" 
                        rightElement={<Switch value={pushNotif} onValueChange={setPushNotif} trackColor={{ false: COLORS.border, true: COLORS.success }} thumbColor={COLORS.white} />}
                        icon={<Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.success} strokeWidth="2"><Path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></Svg>}
                    />
                    <SettingItem 
                        label="Cảnh báo thú cưng mới" 
                        isLast
                        rightElement={<Switch value={petAlerts} onValueChange={setPetAlerts} trackColor={{ false: COLORS.border, true: COLORS.success }} thumbColor={COLORS.white} />}
                        icon={<Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.success} strokeWidth="2"><Path d="M12 5v14M5 12h14" strokeLinecap="round" /></Svg>}
                    />
                </View>

                {/* Section: About */}
                <Text style={styles.sectionTitle}>VỀ CHÚNG TÔI</Text>
                <View style={styles.card}>
                    <SettingItem label="Chính sách bảo mật" icon={<Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.success} strokeWidth="2"><Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></Svg>} />
                    <SettingItem label="Điều khoản dịch vụ" icon={<Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.success} strokeWidth="2"><Path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><Path d="M14 2v6h6"/></Svg>} />
                    <SettingItem label="Liên hệ hỗ trợ" isLast icon={<Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.success} strokeWidth="2"><Path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></Svg>} />
                </View>

                <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Đăng xuất</Text>
                </TouchableOpacity>

                <Text style={styles.versionText}>Phiên bản ứng dụng 1.0.2 (Build 4421)</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background, paddingTop: 50 },
    header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, marginBottom: 20 },
    backBtn: { padding: 10 },
    title: { color: COLORS.white, fontSize: 22, fontWeight: 'bold', marginLeft: 10 },
    scrollContent: { paddingHorizontal: 20, paddingBottom: 50 },
    sectionTitle: { color: COLORS.textSecondary, fontSize: 12, fontWeight: '800', marginBottom: 12, marginTop: 10, letterSpacing: 1 },
    card: { backgroundColor: COLORS.surface, borderRadius: 24, overflow: 'hidden', marginBottom: 25 },
    item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 18, borderBottomWidth: 1, borderBottomColor: COLORS.border },
    itemLeft: { flexDirection: 'row', alignItems: 'center' },
    iconBox: { width: 38, height: 38, borderRadius: 12, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    itemLabel: { color: COLORS.white, fontSize: 16, fontWeight: '500' },
    langSwitch: { flexDirection: 'row', backgroundColor: COLORS.background, borderRadius: 12, padding: 4 },
    langActive: { backgroundColor: COLORS.success, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8 },
    langText: { color: COLORS.white, fontSize: 12, fontWeight: 'bold' },
    logoutBtn: { backgroundColor: '#EF444415', padding: 18, borderRadius: 20, alignItems: 'center', marginTop: 10 },
    logoutText: { color: COLORS.danger, fontWeight: 'bold', fontSize: 16 },
    versionText: { color: COLORS.textSecondary, textAlign: 'center', marginTop: 30, fontSize: 12 }
});