import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

import styles from './recipeCard.module.css'

const RecipeCard = ({ recipeName, time, recipePicture,ownerName, id }) => {
    const navigate = useNavigate('');

    const navigation = () => {
        navigate(`/recipe/${id}`);
    }
    
    return (
        <Card style={{ width: '18rem' }} onClick={navigation}>
            {recipePicture && <Card.Img className={styles['card-image']} variant="top" src={recipePicture} />}
            <Card.Body>
                <Card.Title>{recipeName}</Card.Title>
                <Card.Text>
                    Preparation time: {time}
                </Card.Text>
                <Card.Text>
                    Posted by: {ownerName}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default RecipeCard;