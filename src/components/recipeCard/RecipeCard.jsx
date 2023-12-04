import Card from 'react-bootstrap/Card';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './recipeCard.module.css'
import { Button } from 'react-bootstrap';

const RecipeCard = ({ recipeName, time, recipePicture, ownerName, id }) => {
    const navigate = useNavigate('');
    const { myRecipes } = useParams();

    const navigation = () => {

        if(myRecipes){
            navigate(`/user/catalog/my-recipes/${id}`)
        }else {
            navigate(`/recipe/${id}`);
        }
    }

    return (
        <div>
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

            {myRecipes
                ?
                <div className={styles['buttons']}>
                    <Button variant="primary" >Edit</Button>
                    <Button variant="danger" >Delete</Button>
                </div>
                :
                ''}
        </div>
    );
}

export default RecipeCard;