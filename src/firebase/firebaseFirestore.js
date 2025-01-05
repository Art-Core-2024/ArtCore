import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { firebaseApp } from './firebase';

const db = getFirestore(firebaseApp);

export const addUserToDatabase = async (userData) => {
    try {
        // Validate userData to ensure it has no undefined or invalid properties
        const validUserData = {
            username: userData.username || 'Anonymous',
            email: userData.email || '',
            provider: userData.provider || '',
            role: userData.role || 'user',
        };

        if (!validUserData.email) {
            throw new Error('Email is required to save user data.');
        }

        const userRef = doc(db, 'users', validUserData.email);
        await setDoc(userRef, validUserData, { merge: true });

        console.log('User successfully added to the database.');
    } catch (error) {
        console.error('Error adding user to database:', error.message);
    }
};