import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { COLORS } from '../../utils/theme';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

export default function EditProfileScreen() {
    const navigation = useNavigation();
    const [name, setName] = useState('Alex Paws');
    const [email, setEmail] = useState('alex.paws@email.com');
    const [phone, setPhone] = useState('0987 654 321');

    const handleSave = () => {
        Alert.alert("Thành công", "Thông tin hồ sơ đã được cập nhật!");
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.headerBtn}>Hủy</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Sửa hồ sơ</Text>
                <TouchableOpacity onPress={handleSave}>
                    <Text style={[styles.headerBtn, { color: COLORS.success }]}>Lưu</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.avatarSection}>
                    <View style={styles.avatarWrapper}>
                        <Image source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e' }} style={styles.avatar} />
                        <TouchableOpacity style={styles.cameraIcon}>
                            <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={COLORS.white} strokeWidth="2">
                                <Path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                                <Path d="M12 13a3 3 0 100-6 3 3 0 000 6z" />
                            </Svg>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.changeText}>Thay đổi ảnh đại diện</Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Họ và tên</Text>
                        <TextInput 
                            style={styles.input} 
                            value={name} 
                            onChangeText={setName}
                            placeholderTextColor={COLORS.textSecondary}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput 
                            style={styles.input} 
                            value={email} 
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Số điện thoại</Text>
                        <TextInput 
                            style={styles.input} 
                            value={phone} 
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Địa chỉ</Text>
                        <TextInput 
                            style={[styles.input, { height: 80, textAlignVertical: 'top' }]} 
                            placeholder="Nhập địa chỉ của bạn..."
                            multiline
                            placeholderTextColor={COLORS.textSecondary}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background, paddingTop: 50 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 30 },
    headerBtn: { color: COLORS.white, fontSize: 16, fontWeight: '600' },
    title: { color: COLORS.white, fontSize: 18, fontWeight: 'bold' },
    content: { paddingBottom: 40 },
    avatarSection: { alignItems: 'center', marginBottom: 40 },
    avatarWrapper: { position: 'relative' },
    avatar: { width: 120, height: 120, borderRadius: 60 },
    cameraIcon: { position: 'absolute', bottom: 0, right: 0, backgroundColor: COLORS.success, padding: 10, borderRadius: 20, borderWidth: 4, borderColor: COLORS.background },
    changeText: { color: COLORS.primaryLight, marginTop: 15, fontWeight: '600' },
    form: { paddingHorizontal: 24 },
    inputGroup: { marginBottom: 25 },
    label: { color: COLORS.textSecondary, fontSize: 13, marginBottom: 8, fontWeight: 'bold', marginLeft: 4 },
    input: { backgroundColor: COLORS.surface, borderRadius: 16, padding: 16, color: COLORS.white, fontSize: 16, borderWidth: 1, borderColor: COLORS.border }
});