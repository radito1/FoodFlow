import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, query, orderByChild, onValue } from 'firebase/database';

import styles from './search.module.css';

import RecipeCard from '../recipeCard/RecipeCard';
 // !!! Bad search
const Search = () => {
    const [recipes, setRecipes] = useState([]);
    const { searchTerm } = useParams();

    useEffect(() => {
        const db = getDatabase();
        const recipesRef = ref(db, 'recipes');

        const searchQuery = query(recipesRef, orderByChild('searchByName'));

        onValue(searchQuery, (snapshot) => {
            if (snapshot.exists()) {
                const resultsArray = Object.entries(snapshot.val())
                    .map(([key, value]) => ({ id: key, ...value }))
                    .filter(recipe => recipe.searchByName.includes(searchTerm.toLowerCase()));
                
                setRecipes(resultsArray);
            } else {
                setRecipes([]);
            }
        });
    }, [searchTerm]);

    return (
        <>
            <div className={styles['search-container']}>
                {recipes.length === 0
                    ?
                    <p>No recipes in this search!</p>
                    : <>
                        {recipes.map(recipe => <RecipeCard key={recipe.id} {...recipe} />)}
                    </>
                }
            </div>
        </>
    );
}

export default Search;