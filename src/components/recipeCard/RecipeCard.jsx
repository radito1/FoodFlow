import { useNavigate, useParams } from 'react-router-dom';

import styles from './recipeCard.module.css'

import Card from 'react-bootstrap/Card';

const RecipeCard = ({ recipeName, time, recipePicture, ownerName, id }) => {
    const navigate = useNavigate('');
    const { myRecipes } = useParams();

    const navigation = () => {

        if (myRecipes) {
            navigate(`/user/catalog/my-recipes/${id}`)
        } else {
            navigate(`/recipe/${id}`);
        }
    }

    return (
        <Card className={styles['card-container']} onClick={navigation}>
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