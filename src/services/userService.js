import { ref, push, set, update, remove, get, orderByChild, equalTo, query } from 'firebase/database';
import { database } from '../firebase';

const userRef = ref(database, '/users');

const create = (data, uid) => {
    const userRef = ref(database, `/users/${uid}`);
    return set(userRef, data);
};

export default {
    create,
};