import { ref, push, set, update, remove, get, orderByChild, equalTo, query, child } from 'firebase/database';
import { database } from '../firebase';

const userRef = ref(database, '/users');

const create = (data, uid) => {
    const userRef = ref(database, `/users/${uid}`);
    return set(userRef, data);
};

// TODO function overwrites the whole database
const getUserData = async (uid) => {
    const userRef = ref(database, `/users/${uid}`);

    try {
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log("No data available");
            return null; // or throw an error if needed
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const updateUserData = async (newData, uid) => {
    const userRef = ref(database, `/users/${uid}`);

    try {
        await set(userRef, newData);
        console.log('User data updated successfully.');
    } catch (error) {
        console.error('Error updating user data:', error);
        throw error;
    }
};

export default {
    create,
    getUserData,
    updateUserData,
};