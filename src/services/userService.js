import { ref, push, set, update, remove, get, orderByChild, equalTo, query } from 'firebase/database';
import { database } from '../firebase';

const recipeRef = ref(database, '/recipe');

const create = (data) => {
    // Push data to a new auto-generated key
    const newRecipeRef = push(recipeRef);
    return set(newRecipeRef, data);
};

export default {
    create,
};