import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { COLORS } from '../../utils/theme';

export default function MapScreen() {
    return (
        <View style={styles.container}>
            {/* Mock Map Background */}
            <View style={styles.mapBackground}>
                <Text style={{color: '#334155'}}>Map View</Text>
            </View>

            {/* Header Overlay */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Trạm cứu hộ</Text>
                <TextInput 
                    style={styles.searchBar} 
                    placeholder="Tìm địa điểm..." 
                    placeholderTextColor={COLORS.textSecondary} 
                />
            </View>

            {/* Bottom Card - Style giống hình mẫu */}
            <View style={styles.bottomCard}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>Gần bạn nhất</Text>
                    <Text style={styles.seeAll}>Xem danh sách</Text>
                </View>
                <View style={styles.locationItem}>
                    <View style={styles.iconBox} />
                    <View>
                        <Text style={styles.locName}>Pet Care Center</Text>
                        <Text style={styles.locStatus}>Đang mở cửa • 2km</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    mapBackground: { ...StyleSheet.absoluteFillObject, backgroundColor: '#0F172A', justifyContent: 'center', alignItems: 'center' },
    
    header: { position: 'absolute', top: 50, left: 24, right: 24 },
    headerTitle: { fontSize: 28, fontWeight: 'bold', color: COLORS.white, marginBottom: 15 },
    searchBar: { backgroundColor: COLORS.surface, borderRadius: 20, padding: 16, color: COLORS.white, shadowColor: "#000", shadowOpacity: 0.3, elevation: 5 },

    bottomCard: { position: 'absolute', bottom: 100, left: 24, right: 24, backgroundColor: COLORS.surface, borderRadius: 24, padding: 20 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
    cardTitle: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },
    seeAll: { color: COLORS.primaryLight, fontSize: 12 },
    
    locationItem: { flexDirection: 'row', alignItems: 'center' },
    iconBox: { width: 50, height: 50, borderRadius: 16, backgroundColor: '#1E293B', marginRight: 15 },
    locName: { color: COLORS.white, fontSize: 16, fontWeight: '600' },
    locStatus: { color: COLORS.success, fontSize: 12, marginTop: 4 },
});