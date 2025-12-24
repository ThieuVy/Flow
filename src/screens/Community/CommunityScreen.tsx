import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { COLORS } from '../../utils/theme';
import Svg, { Path } from 'react-native-svg';

const POSTS = [
    { id: '1', user: 'Hoàng Nam', content: 'Mình vừa nhận nuôi bé Corgi này, trộm vía bé rất ngoan!', image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1', likes: 24 },
    { id: '2', user: 'Minh Thư', content: 'Trạm cứu hộ Sài Gòn đang cần thêm tình nguyện viên cuối tuần này ạ.', image: null, likes: 15 },
    { id: '3', user: 'Tuấn Anh', content: 'Tìm chủ mới cho bé mèo anh lông ngắn.', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba', likes: 42 },
];

export default function CommunityScreen() {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Cộng đồng</Text>
                <TouchableOpacity style={styles.newPostBtn}>
                    <Text style={styles.newPostText}>Đăng bài</Text>
                </TouchableOpacity>
            </View>

            {/* Input Placeholder */}
            <View style={styles.inputContainer}>
                <View style={styles.avatar} />
                <TextInput 
                    placeholder="Bạn đang nghĩ gì?" 
                    placeholderTextColor={COLORS.textSecondary}
                    style={styles.input}
                />
            </View>

            {/* Feed */}
            <FlatList 
                data={POSTS}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
                renderItem={({ item }) => (
                    <View style={styles.postCard}>
                        <View style={styles.postHeader}>
                            <View style={styles.postAvatar} />
                            <View>
                                <Text style={styles.postUser}>{item.user}</Text>
                                <Text style={styles.postTime}>2 giờ trước</Text>
                            </View>
                        </View>
                        <Text style={styles.postContent}>{item.content}</Text>
                        {item.image && (
                            <Image source={{ uri: item.image }} style={styles.postImage} resizeMode="cover" />
                        )}
                        <View style={styles.postActions}>
                            <View style={styles.actionItem}>
                                <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.textSecondary} strokeWidth="2"><Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></Svg>
                                <Text style={styles.actionText}>{item.likes}</Text>
                            </View>
                            <View style={styles.actionItem}>
                                <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.textSecondary} strokeWidth="2"><Path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></Svg>
                                <Text style={styles.actionText}>Bình luận</Text>
                            </View>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 24, paddingTop: 50 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    headerTitle: { fontSize: 24, fontWeight: 'bold', color: COLORS.white },
    newPostBtn: { backgroundColor: COLORS.surface, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
    newPostText: { color: COLORS.primaryLight, fontWeight: 'bold' },

    inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, padding: 16, borderRadius: 20, marginBottom: 20 },
    avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#334155', marginRight: 12 },
    input: { flex: 1, color: COLORS.white },

    postCard: { backgroundColor: COLORS.surface, borderRadius: 24, padding: 16, marginBottom: 20 },
    postHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    postAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#475569', marginRight: 12 },
    postUser: { color: COLORS.white, fontWeight: 'bold', fontSize: 16 },
    postTime: { color: COLORS.textSecondary, fontSize: 12 },
    postContent: { color: '#E2E8F0', fontSize: 14, lineHeight: 20, marginBottom: 12 },
    postImage: { width: '100%', height: 200, borderRadius: 16, marginBottom: 12 },
    postActions: { flexDirection: 'row', gap: 20 },
    actionItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    actionText: { color: COLORS.textSecondary, fontSize: 14 },
});