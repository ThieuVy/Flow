import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { COLORS } from '../../utils/theme';

const PETS = [
    { id: '1', name: 'Google Home', status: '65% charging', image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1', label: 'Corgi' },
    { id: '2', name: 'Air Conditioner', status: '25°C Temp', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba', label: 'Mèo Anh' },
    { id: '3', name: 'Smart TV', status: 'Active', image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e', label: 'Pug' },
    { id: '4', name: 'Router', status: 'Online', image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5', label: 'Mèo Ta' },
];

export default function AdoptionScreen() {
    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
            <Text style={styles.name}>{item.label}</Text>
            <Text style={styles.status}>{item.status}</Text>
             {/* Battery/Status Icon Simulation */}
            <View style={styles.statusIcon}>
                <View style={[styles.batteryLevel, { height: '60%', backgroundColor: COLORS.success }]} />
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Nhận nuôi</Text>
                <Text style={styles.headerSub}>Tìm kiếm người bạn mới</Text>
            </View>
            <FlatList 
                data={PETS}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 24, paddingTop: 50 },
    header: { marginBottom: 20 },
    headerTitle: { fontSize: 28, fontWeight: 'bold', color: COLORS.white },
    headerSub: { fontSize: 14, color: COLORS.textSecondary, marginTop: 4 },
    
    // Style giống "Devices" cards
    card: { width: '47%', backgroundColor: COLORS.surface, borderRadius: 24, padding: 12, marginBottom: 20, height: 220, justifyContent: 'space-between' },
    image: { width: '100%', height: 120, borderRadius: 16, marginBottom: 12, alignSelf: 'center' },
    name: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },
    status: { color: COLORS.success, fontSize: 12, fontWeight: '600' },
    
    // Mô phỏng icon pin/status bên góc phải dưới card trong hình mẫu
    statusIcon: { position: 'absolute', bottom: 12, right: 12, width: 14, height: 24, borderRadius: 4, borderWidth: 1, borderColor: '#334155', justifyContent: 'flex-end', padding: 1 },
    batteryLevel: { width: '100%', borderRadius: 2 },
});