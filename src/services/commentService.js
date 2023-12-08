import { ref, push, set, get } from 'firebase/database';
import { database } from '../firebase';

const getAll = async (id) => {
    const commentsRef = ref(database, `/comments/${id}`);
    const snapshot = await get(commentsRef);

    if (snapshot.exists()) {
        return Object.entries(snapshot.val()).map(([key, value]) => ({ id: key, ...value }));
    } else {
        console.log('No comments available');
        return [];
    }
};

const create = async (id, data) => {
    const newCommentRef = push(ref(database, `/comments/${id}`));
    await set(newCommentRef, data);

    const snapshot = await get(newCommentRef);
    return { id: newCommentRef.key, ...snapshot.val() };
};

export default {
    getAll,
    create
};