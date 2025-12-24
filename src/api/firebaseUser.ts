import firestore from '@react-native-firebase/firestore';

export const createUserDocument = async ({
    uid,
    email,
    displayName,
}: {
    uid: string;
    email: string | null;
    displayName?: string;
}) => {
    const userRef = firestore().collection('users').doc(uid);

    const snapshot = await userRef.get();

    // Tránh ghi đè nếu user đã tồn tại
    if (!snapshot.exists) {
        await userRef.set({
            uid,
            email,
            displayName: displayName || '',
            role: 'user',              // RẤT QUAN TRỌNG
            avatar: '',
            createdAt: firestore.FieldValue.serverTimestamp(),
            updatedAt: firestore.FieldValue.serverTimestamp(),
        });
    }
};
