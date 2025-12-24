import auth from '@react-native-firebase/auth';
import { createUserDocument } from './firebaseUser';

export const signInWithEmail = async (email: string, password: string) => {
    return auth().signInWithEmailAndPassword(email, password);
};

export const signUpWithEmail = async (
    email: string,
    password: string,
    displayName?: string
) => {
    const credential = await auth().createUserWithEmailAndPassword(
        email,
        password
    );

    const user = credential.user;

    // (Optional) set display name cho Auth
    if (displayName) {
        await user.updateProfile({ displayName });
    }

    // TẠO USER DOCUMENT
    await createUserDocument({
        uid: user.uid,
        email: user.email,
        displayName,
    });

    return credential;
};

export const signOut = async () => {
    return auth().signOut();
};

export const onAuthStateChanged = (callback: (user: any) => void) => {
    return auth().onAuthStateChanged(callback);
};
