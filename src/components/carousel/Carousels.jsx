import { useState } from 'react';
import styles from './carousels.module.css'

import Carousel from 'react-bootstrap/Carousel';

function Carousels() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel className={styles['carousel-container']} activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <img className={styles['carousel-image']} src="https://www.acouplecooks.com/wp-content/uploads/2020/06/Caesar-Salad-022-735x919.jpg" alt="" />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className={styles['carousel-image']} src="https://www.acouplecooks.com/wp-content/uploads/2020/06/Caesar-Salad-022-735x919.jpg" alt="" />
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className={styles['carousel-image']} src="https://www.acouplecooks.com/wp-content/uploads/2020/06/Caesar-Salad-022-735x919.jpg" alt="" />
                <Carousel.Caption>
                    <h3>Third slide label</h3>  
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default Carousels;