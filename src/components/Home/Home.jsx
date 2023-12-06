import Carousels from '../carousel/Carousels';
import styles from './home.module.css';

const Home = () => {
    return (
        <div className={styles['home-container']}>
            <h1 >Welcome to Food Flow - Where Culinary Creativity Flows!</h1>
            <p className={styles.info}>
                Discover the joy of sharing and exploring mouthwatering recipes from around the world.
                Food Flow is your go-to platform for all things delicious, where home chefs and food enthusiasts unite.
                Whether you're craving comforting classics, daring desserts, or sizzling grilling masterpieces, our community has it all.
            </p>

            <div className={styles['latest-container']}>
                <h2>Latest Culinary Delights Unveiled!</h2>
                    <Carousels />
                <div className={styles['latest-section']}>
                    <div className={styles['latest-info-container']}>
                        <div className={styles['latest-info']}>
                            <p>👨‍🍳 Fresh Ideas Every Day: Immerse yourself in a carousel of inspiration, featuring the most recent and mouthwatering creations. Our chefs, both seasoned and aspiring, bring fresh ideas to your plate daily.</p>
                            <p>🌟 Tried, Tested, and Loved: These recipes aren't just visually appealing; they've been tried, tested, and loved by our vibrant community. Join the conversation, try them at home, and let your taste buds dance!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;