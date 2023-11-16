import { ref, push, set, update, remove, get, orderByChild, equalTo, query } from 'firebase/database';
import { database } from '../firebase';

const recipeRef = ref(database, '/recipes');

const getAll = async () => {
  try {
    const snapshot = await get(recipeRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log('No data available');
      return null;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
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
      console.log('No matching data');
      return null;
    }
  } catch (error) {
    console.error('Error fetching filtered data:', error);
    throw error;
  }
};

const create = (data) => {
  // Push data to a new auto-generated key
  const newRecipeRef = push(recipeRef);
  return set(newRecipeRef, data);
};

const updateRecipe = (key, data) => {
  // Update data at a specific key
  return update(ref(recipeRef, key), data);
};

const removeRecipe = (key) => {
  // Remove data at a specific key
  return remove(ref(recipeRef, key));
};

const removeAllRecipes = () => {
  // Remove all data
  return set(recipeRef, null);
};

export default {
  getAll,
  create,
  updateRecipe,
  removeRecipe,
  removeAllRecipes,
  getByFilter
};