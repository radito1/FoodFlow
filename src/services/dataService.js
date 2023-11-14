import { ref, push, set, update, remove } from 'firebase/database';
import { database } from '../firebase';

const recipeRef = ref(database, '/recipe');

const getAll = () => {
  return recipeRef;
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
};