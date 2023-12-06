import { ref, push, set, get } from 'firebase/database';
import { database } from '../firebase';

const commentRef = ref(database, '/comments');

const getAll = async () => {
    try {
        const snapshot = await get(commentRef);
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log('No comments available');
            return null;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const create = async (id, data) => {
    const commentsRef = ref(database, `/comments/${id}`);
    const newCommentRef = push(commentsRef);

    await set(newCommentRef, data);

    const snapshot = await get(newCommentRef);
    return snapshot.val();
};

export default {
    getAll,
    create
};