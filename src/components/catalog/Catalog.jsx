import { useEffect, useState } from 'react';
import dataService from '../../services/dataService';
import RecipeCard from '../recipeCard/RecipeCard';
import './catalog.css';

const Catalog = ({ category }) => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {

        if (category) {
            const fetchData = async () => {
                try {
                    const recipesData = await dataService.getByFilter('category', `${category}`);
                    if (recipesData) {
                        const recipesArray = Object.entries(recipesData).map(([key, value]) => ({ id: key, ...value }));
                        setRecipes(recipesArray);
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchData();
        } else {
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
        }
        // TODO: maybe I need to add something the check for changes
    }, [category]);

    return (
        // TODO: I have to add text if there are no recipes to show
        <div className='catalog-container'>
            {recipes.map(recipe => <RecipeCard key={recipe.id} {...recipe} />)}
        </div>
    );
}

export default Catalog;