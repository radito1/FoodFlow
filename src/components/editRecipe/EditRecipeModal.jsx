import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import dataService from '../../services/dataService';
import { notifySuccess, notifyError } from '../../utils/toasts';

import styles from './editRecipeModal.module.css'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const validationSchema = Yup.object().shape({
    recipeName: Yup.string().required('Recipe Name is required'),
    category: Yup.string().required('Category is required'),
    recipePicture: Yup.string().url('Invalid URL').required('Recipe image URL is required'),
    time: Yup.string().required('Time is required'),
    recipeText: Yup.string().required('Recipe Text is required'),
});

const EditRecipeModal = (props) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });

    useEffect(() => {
        if (props.data) {
            setValue('recipeName', props.data.recipeName);
            setValue('category', props.data.category);
            setValue('recipePicture', props.data.recipePicture);
            setValue('time', props.data.time);
            setValue('recipeText', props.data.recipeText);
        }
    }, [props.data, setValue]);

    const updateRecipe = async (data) => {
        try {
            let categoryFix = data.category.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-');

            let newData = {
                recipeName: data.recipeName,
                recipeText: data.recipeText,
                category: categoryFix,
                recipePicture: data.recipePicture,
                time: data.time,
            };

            await dataService.updateRecipe(newData, props.id);
            props.onHide();
            notifySuccess('Successful edit!')
        } catch (error) {
            console.log(error);
            notifyError('There was an error while trying to edit recipe!')
        }
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Recipe
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className={styles.form} onSubmit={handleSubmit(updateRecipe)}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label >Recipe name</Form.Label>
                        <Form.Control {...register('recipeName')} />
                        <Form.Text className="text-danger">{errors.recipeName?.message}</Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor='category'>Select category</Form.Label>
                        <Form.Select id='category' aria-label="Default select example" {...register('category')}>
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
                        <Form.Control {...register('recipePicture')} />
                        <Form.Text className="text-danger">{errors.recipePicture?.message}</Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor='time'>Select preparation time</Form.Label>
                        <Form.Select id='time' aria-label="Default select example" {...register('time')}>
                            <option>less than 15min</option>
                            <option>15min</option>
                            <option>30min</option>
                            <option>45min</option>
                            <option>1hour</option>
                            <option>1h:15min</option>
                            <option>1h:30min</option>
                            <option>1h:45min</option>
                            <option>2hours</option>
                            <option>more than 2 hours</option>
                        </Form.Select>
                        <Form.Text className="text-danger">{errors.time?.message}</Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Recipe text</Form.Label>
                        <Form.Control as="textarea" {...register('recipeText')} rows={3} />
                        <Form.Text className="text-danger">{errors.recipeText?.message}</Form.Text>
                    </Form.Group>
                    <Button type='submit'>Save</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default EditRecipeModal;