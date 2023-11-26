import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

import styles from './recipeCard.module.css'

const RecipeCard = ({ recipeName, recipeText, recipePicture, id }) => {
    const navigate = useNavigate('');

    const navigation = () => {
        console.log('Vliza');
        navigate(`/recipe/${id}`);
    }
    
    return (
        <Card style={{ width: '18rem' }} onClick={navigation}>
            {recipePicture && <Card.Img className={styles['card-image']} variant="top" src={recipePicture} />}
            <Card.Body>
                <Card.Title>{recipeName}</Card.Title>
                <Card.Text>
                    {recipeText}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default RecipeCard;