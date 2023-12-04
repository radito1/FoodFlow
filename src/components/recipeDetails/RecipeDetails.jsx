import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';

import dataService from '../../services/dataService';
import styles from './recipeDetails.module.css'

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import EditRecipeModal from '../editRecipe/EditRecipeModal';
import ConfirmationModal from '../confirmationModal/ConfirmationModal';

const RecipeDetails = () => {
    const { myRecipes, id } = useParams();
    const [modalShow, setModalShow] = useState(false);
    const [secondModalShow, setSecondModalShow] = useState(false);
    const [recipeData, setRecipeData] = useState({});
    const db = getDatabase();
    const navigate = useNavigate();

    const deleteHandler = () => {
        dataService.removeRecipe(id)
            .then(() => {
                navigate('/catalog/all-recipes');
            })
            .catch((error) => {
                console.error('Error removing recipe:', error);
            });
    }

    useEffect(() => {
        if (!id) {
            return;
        }

        const userRef = ref(db, `/recipes/${id}`);

        const onDataChange = (snapshot) => {
            const data = snapshot.val();
            setRecipeData(data);
        };

        const onError = (error) => {
            console.error('Error fetching recipe data:', error);
        };

        const unsubscribe = onValue(userRef, onDataChange, { errorCallback: onError });

        return () => {
            unsubscribe();
        };
    }, [id])
    return (
        <div className={styles['recipeDetails-container']}>
            <Card style={{ width: '25rem' }}>
                <Card.Img variant="top" src={recipeData?.recipePicture} />
                <Card.Body>
                    <Card.Title>{recipeData?.recipeName}</Card.Title>
                    <Card.Text>Preparation time: {recipeData?.time}</Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>{recipeData?.recipeText}</ListGroup.Item>
                </ListGroup>
                {myRecipes
                    ?
                    <div className={styles['buttons']}>
                        <Button variant="primary" onClick={() => setModalShow(true)}>
                            Edit
                        </Button>
                        <Button variant="danger" onClick={() => setSecondModalShow(true)}>
                            Delete
                        </Button>
                    </div>
                    : ''
                }
            </Card>

            <EditRecipeModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                id={id}
                data={recipeData}
            />

            <ConfirmationModal
                show={secondModalShow}
                onHide={() => setSecondModalShow(false)}
                id={id}
                delete={deleteHandler}
            />


        </div>
    );
}

export default RecipeDetails;
