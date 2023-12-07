import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { notifySuccess, notifyError } from '../../utils/toasts';
import AuthContext from '../../contexts/authContext';


import styles from './create.module.css';
import dataService from '../../services/dataService';

import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';

const Create = () => {
    const initialState = {
        recipeName: '',
        recipeText: '',
        recipePicture: '',
        category: '',
        time: '',
        ownerId: '',
    };
    const navigate = useNavigate('');
    const {
        userId,
        username
    } = useContext(AuthContext);

    const schema = yup.object().shape({
        recipeName: yup.string().required('Recipe name is required'),
        category: yup.string().required('Category is required'),
        recipePicture: yup.string().url('Invalid URL').required('Recipe image URL is required'),
        time: yup.string().required('Preparation time is required'),
        recipeText: yup.string().required('Recipe text is required'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: initialState,
    });

    const onSubmit = (data) => {
        let categoryFix = data.category.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-');

        let recipeData = {
            recipeName: data.recipeName,
            recipeText: data.recipeText,
            category: categoryFix,
            recipePicture: data.recipePicture,
            time: data.time,
            ownerId: userId,
            ownerName: username,
            timestamp: new Date().toISOString(),
        };

        dataService.create(recipeData)
            .then(() => {
                navigate('/catalog/all-recipes');
                notifySuccess('Recipe added succesfully!');
            })
            .catch(e => {
                console.log(e);
                notifyError('There was an error trying to add recipe!');
            });
    };

    return (
        <div className={styles['form-container']}>
            <h2>Add Recipe</h2>
            <Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Recipe name</Form.Label>
                    <Form.Control
                        type="text"
                        {...register('recipeName')}
                        placeholder="Enter recipe name"
                    />
                    <Form.Text className="text-danger">{errors.recipeName?.message}</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor='category'>Select category</Form.Label>
                    <Form.Select
                        aria-label="Default select example"
                        id='category'
                        {...register('category')}
                        placeholder="Select Category"
                    >
                        <option>Appetizers</option>
                        <option>Main Courses</option>
                        <option>Soups</option>
                        <option>Desserts</option>
                        <option>Salads</option>
                        <option>Beverages</option>
                        <option>Baking</option>
                        <option>Vegetarian/Vegan</option>
                        <option>Grilling/BBQ</option>
                        <option>International Cuisine</option>
                        <option>Burgers/Sandwiches</option>
                    </Form.Select>
                    <Form.Text className="text-danger">{errors.category?.message}</Form.Text>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInputPicture">
                    <Form.Label>Recipe image</Form.Label>
                    <Form.Control
                        type="text"
                        {...register('recipePicture')}
                        placeholder="Enter recipe image URL"
                    />
                    <Form.Text className="text-danger">{errors.recipePicture?.message}</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor='time'>Select preparation time</Form.Label>
                    <Form.Select
                        aria-label="Default select example"
                        id='time'
                        {...register('time')}
                        placeholder="Select Preparation Time"
                    >
                        <option>less then 15min</option>
                        <option>15min</option>
                        <option>30min</option>
                        <option>45min</option>
                        <option>1hour</option>
                        <option>1h:15min</option>
                        <option>1h:30min</option>
                        <option>1h:45min</option>
                        <option>2hours</option>
                        <option>more then 2 hours</option>
                    </Form.Select>
                    <Form.Text className="text-danger">{errors.time?.message}</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Recipe text</Form.Label>
                    <Form.Control
                        as="textarea"
                        {...register('recipeText')}
                        rows={3}
                        placeholder="Enter recipe text"
                    />
                    <Form.Text className="text-danger">{errors.recipeText?.message}</Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default Create;