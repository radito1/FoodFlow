import { useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import AuthContext from '../../contexts/authContext';
import dataService from '../../services/dataService';
import reducer from './commentReduce';
import styles from './recipeDetails.module.css'
import commentService from '../../services/commentService';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import EditRecipeModal from '../editRecipe/EditRecipeModal';
import ConfirmationModal from '../confirmationModal/ConfirmationModal';
import formatDate from '../../utils/formatData';

const commentSchema = Yup.object().shape({
    comment: Yup.string().required('Comment is required'),
});

const RecipeDetails = () => {
    const { myRecipes, id } = useParams();
    const { isAuthenticated, username } = useContext(AuthContext);
    const [modalShow, setModalShow] = useState(false);
    const [secondModalShow, setSecondModalShow] = useState(false);
    const [comments, dispatch] = useReducer(reducer, null);
    const [recipeData, setRecipeData] = useState({});
    const [commentsDispatched, setCommentsDispatched] = useState(false)
    const db = getDatabase();
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
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

        const commentsRef = ref(db, `/comments/${id}`);
        const commentsListener = onValue(commentsRef, (snapshot) => {
            const commentsData = snapshot.val();
            if (commentsData) {
                const commentsArray = Object.entries(commentsData).map(([key, value]) => ({ id: key, ...value }));
                dispatch({ type: 'SET_COMMENTS', payload: commentsArray });
                setCommentsDispatched(true);
            }
        });

        return () => {
            unsubscribe();
            commentsListener();
            setCommentsDispatched(false);
        };
    }, [id, commentsDispatched]);

    const addCommentHandler = async (values) => {
        const data = {
            comment: values.comment,
            owner: username,
        };

        try {
            await commentService.create(id, data);
            const updatedComments = await commentService.getAll(id);
            dispatch({ type: 'SET_COMMENTS', payload: updatedComments });

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
                    <Card.Text className={styles['posted-on']}>
                        Posted on: {formatDate(recipeData?.timestamp)}
                    </Card.Text>
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

            {comments && (
                <>
                    {comments.map((comment) => (
                        <ListGroup.Item key={comment.id}>
                            <div className={styles['comment-container']}>
                                <div className={styles.username}>
                                    {comment.owner}
                                </div>
                                <div className={styles.comment}>
                                    {comment.comment}
                                </div>
                            </div>
                        </ListGroup.Item>
                    ))}
                </>
            )}

            {isAuthenticated
                ?
                <article className="create-comment">
                    <Form onSubmit={handleSubmit(addCommentHandler)}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label className={styles.label}>Add Comment</Form.Label>
                            <Form.Control as="textarea" rows={3} {...register('comment')} onChange={handleInputChange} />
                            <div className={styles.inform}>
                                <Form.Text className="text-danger">{errors.comment?.message}</Form.Text>
                                <Button variant="primary" type="submit">
                                    Add
                                </Button>
                            </div>
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
