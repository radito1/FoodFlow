import { useEffect, useState } from 'react';
import styles from './carousels.module.css'

import Carousel from 'react-bootstrap/Carousel';
import dataService from '../../services/dataService';

function Carousels() {
    const [index, setIndex] = useState(0);
    const [latestPosts, setLatestPosts] = useState([]);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await dataService.getByTime(3);
                const recipesArray = Object.entries(data).map(([key, value]) => ({ id: key, ...value }));
                setLatestPosts(recipesArray);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Carousel className={styles['carousel-container']} activeIndex={index} onSelect={handleSelect} slide={false}>
            {latestPosts.map(recipe =>
                <Carousel.Item>
                    <img className={styles['carousel-image']} src={recipe.recipePicture} alt={recipe.recipeName} />
                    <Carousel.Caption>
                        <h3>{recipe.recipeName}</h3>
                    </Carousel.Caption>
                </Carousel.Item>)}
        </Carousel>
    );
}

export default Carousels;


<Carousel.Item>
    <img className={styles['carousel-image']} src="https://www.acouplecooks.com/wp-content/uploads/2020/06/Caesar-Salad-022-735x919.jpg" alt="" />
    <Carousel.Caption>
        <h3>First slide label</h3>
    </Carousel.Caption>
</Carousel.Item>