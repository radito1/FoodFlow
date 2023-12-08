import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getDatabase, ref, query, orderByChild, startAt, onValue } from 'firebase/database';

import RecipeCard from '../recipeCard/RecipeCard';

const Search = () => {
    const [recipes, setRecipes] = useState([]);
    const { searchTerm } = useParams();

    useEffect(() => {
        const db = getDatabase();
        const recipesRef = ref(db, 'recipes');
        
        const searchQuery = query(recipesRef, orderByChild('searchByName'), startAt(searchTerm.toLowerCase()));

        onValue(searchQuery, (snapshot) => {
            if (snapshot.exists()) {
                const resultsArray = Object.entries(snapshot.val()).map(([key, value]) => ({ id: key, ...value }));
                setRecipes(resultsArray);
            } else {
                setRecipes([]);
            }
        });
    }, [searchTerm]);

    return (
        <>
            <div >
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


