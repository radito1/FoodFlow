import { useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import * as Yup from 'yup';

import AuthContext from '../../contexts/authContext';
import dataService from '../../services/dataService';
import reducer from './commentReduce';
import styles from './recipeDetails.module.css'

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import EditRecipeModal from '../editRecipe/EditRecipeModal';
import ConfirmationModal from '../confirmationModal/ConfirmationModal';

const commentSchema = Yup.object().shape({
    comment: Yup.string().required('Comment is required'),
});

const RecipeDetails = () => {
    const { myRecipes, id } = useParams();
    const { isAuthenticated } = useContext(AuthContext);
    const [modalShow, setModalShow] = useState(false);
    const [secondModalShow, setSecondModalShow] = useState(false);
    const [comments, dispatch] = useReducer(reducer, []);
    const [recipeData, setRecipeData] = useState({});
    const db = getDatabase();
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm < CommentForm > ({
        resolver: yupResolver(commentSchema),
    });

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
    }, [id]);

    const addCommentHandler = async (values) => {
        try {
            const newComment = await commentService.create(id, values.comment);
            newComment.owner = { email };

            dispatch({
                type: 'ADD_COMMENT',
                payload: newComment,
            });

            // Clear the comment field after successful submission
            setValue('comment', '');
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (e) => {
        setValue('comment', e.target.value);
    };

    const deleteHandler = () => {
        dataService.removeRecipe(id)
            .then(() => {
                navigate('/catalog/all-recipes');
            })
            .catch((error) => {
                console.error('Error removing recipe:', error);
            });
    }

    // const { values, onChange, onSubmit } = useForm(addCommentHandler, {
    //     comment: '',
    // });

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
            {isAuthenticated
                ?
                <article className="create-comment">
                    <Form onSubmit={handleSubmit(addCommentHandler)}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Add Comment</Form.Label>
                            <Form.Control as="textarea" rows={3} {...register('comment')} onChange={handleInputChange} />
                            <Form.Text className="text-danger">{errors.comment?.message}</Form.Text>
                            <Button variant="primary" type="submit">
                                Add
                            </Button>
                        </Form.Group>
                    </Form>
                </article>
                : ''
            }

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
