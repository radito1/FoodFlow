import { useEffect, useState } from 'react';
import dataService from '../../services/dataService';
import RecipeCard from '../recipeCard/RecipeCard';
import styles from './Catalog.module.css'

const Catalog = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const recipesData = await dataService.getAll();
                if (recipesData) {
                    const recipesArray = Object.entries(recipesData).map(([key, value]) => ({ id: key, ...value }));
                    setRecipes(recipesArray);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={styles['catalog-container']}>
            {recipes.map(recipe => <RecipeCard key={recipe.id} {...recipe} />)}
        </div>
    );
}

export default Catalog;