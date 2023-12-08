import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { notifySuccess, notifyError } from '../../utils/toasts';

import userService from '../../services/userService';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    address: Yup.string().required('Address is required'),
    description: Yup.string().required('Description is required'),
});

const EditProfileModal = (props) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });

    useEffect(() => {
        if (props.data) {
            setValue('firstName', props.data.firstName);
            setValue('lastName', props.data.lastName);
            setValue('address', props.data.address);
            setValue('description', props.data.description);
        }
    }, [props.data, setValue]);

    const updateUser = async (data) => {
        try {
            await userService.updateUserData(data, props.uid);
            props.onHide();
            notifySuccess('User data edited successfuly!')
        } catch (error) {
            console.log(error);
            notifyError('There was an error while trying to edit user!')
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
                    Edit Profile
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(updateUser)}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="firstName">First Name</Form.Label>
                        <Form.Control id='firstName' {...register('firstName')} autoComplete="custom-autocomplete-1" />
                        <Form.Text className="text-danger">{errors.firstName?.message}</Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="lastName">Last Name</Form.Label>
                        <Form.Control id='lastName' {...register('lastName')} autoComplete="custom-autocomplete-2" />
                        <Form.Text className="text-danger">{errors.lastName?.message}</Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="address">Address</Form.Label>
                        <Form.Control id='address' {...register('address')} autoComplete="custom-autocomplete-3" />
                        <Form.Text className="text-danger">{errors.address?.message}</Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3 text-area">
                        <Form.Label htmlFor="description">Description</Form.Label>
                        <Form.Control id='description' as="textarea" {...register('description')} autoComplete="custom-autocomplete-4" />
                        <Form.Text className="text-danger">{errors.description?.message}</Form.Text>
                    </Form.Group>
                    <Button variant="success" type="submit">Save</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditProfileModal;