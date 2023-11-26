import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './catalog.module.css';
import dataService from '../../services/dataService';

import RecipeCard from '../recipeCard/RecipeCard';

//TODO : looks like it is working now but test is again if it renders corect data!!! 

const Catalog = (params) => {
    const [recipes, setRecipes] = useState([]);
    const { category } = useParams();

    const fetchData = async (key, value) => {
        try {
            const recipesData = await dataService.getByFilter(`${key}`, `${value}`);
            if (recipesData) {
                const recipesArray = Object.entries(recipesData).map(([key, value]) => ({ id: key, ...value }));
                setRecipes(recipesArray);
            } else {
                setRecipes([]);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        if (category) {
            fetchData('category', category);
        } else if (params.uid) {
            fetchData('owner', params.uid);
        } else if (params.all) {
            dataService.getAll()
                .then(data => {
                    const recipesArray = Object.entries(data).map(([key, value]) => ({ id: key, ...value }));
                    setRecipes(recipesArray);
                })
        } else {
            setRecipes([]);
        }

    }, [category, category]);

    return (
        <>
            <div className={styles['catalog-container']}>
                {recipes.length === 0
                    ?
                    <p>No recipes in this category!</p>
                    : <>
                        {recipes.map(recipe => <RecipeCard key={recipe.id} {...recipe} />)}
                    </>
                }
            </div>
        </>
    );
}

export default Catalog;