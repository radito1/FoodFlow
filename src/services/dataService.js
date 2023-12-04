import { ref, push, set, update, remove, get, orderByChild, equalTo, query, limitToLast, onValue } from 'firebase/database';
import { database } from '../firebase';

const recipeRef = ref(database, '/recipes');

const getAll = async () => {
  try {
    const snapshot = await get(recipeRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log('No recipes available');
      return null;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const getById = async (id) => {
  const dataRef = ref(database, `/recipes/${id}`);

  try {
    const snapshot = await get(dataRef);

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log('No data available for the specified id');
      return null;
    }
  } catch (error) {
    console.error('Error fetching data by id:', error);
    throw error;
  }
};

const getByFilter = async (filterKey, filterValue) => {
  try {
    const filteredSnapshot = await get(
      query(
        recipeRef,
        orderByChild(filterKey),
        equalTo(filterValue)
      )
    );

    if (filteredSnapshot.exists()) {
      return filteredSnapshot.val();
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error fetching filtered data:', error);
    throw error;
  }
};

const getByTime = async (count) => {
  return new Promise((resolve, reject) => {
    const recipeRef = ref(database, '/recipes');
    const latestPostsQuery = query(recipeRef, orderByChild('timestamp'), limitToLast(count));

    onValue(latestPostsQuery, (snapshot) => {
      if (snapshot.exists()) {
        const posts = snapshot.val();
        resolve(posts);
      } else {
        console.log('No posts available.');
        resolve([]);
      }
    }, (error) => {
      console.error('Error fetching data:', error);
      reject(error);
    });
  });
}

const create = (data) => {
  const newRecipeRef = push(recipeRef);
  return set(newRecipeRef, data);
};

const updateRecipe = (key, data) => {
  return update(ref(recipeRef, key), data);
};

const removeRecipe = (key) => {

  return remove(ref(recipeRef, key));
};




export default {
  getAll,
  getById,
  getByFilter,
  getByTime,
  create,
  updateRecipe,
  removeRecipe,
};