// import { useEffect, useState } from 'react';

// import "./editUserModal.css"
// import userService from '../../services/userService';

// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';


// //TODO Data doesn't populate on inialial load
// const EditProfileModal = (props) => {
//     const [userData, setUserData] = useState({
//         firstName: '',
//         lastName: '',
//         address: '',
//         description: '',
//     });

//     useEffect(() => {
//         setUserData(props.data);
//     }, [props.data])

//     const handleInputChange = (e) => {
//         setUserData({ ...userData, [e.target.name]: e.target.value });
//     };

//     const updateUser = (e) => {
//         e.preventDefault();

//         let data = {
//             firstName: userData.firstName,
//             lastName: userData.lastName,
//             address: userData.address,
//             description: userData.description
//         }

//         userService.updateUserData(data, props.uid)
//             .then(() => {
//                 props.onHide()
//             })
//             .catch(e => {
//                 console.log(e);
//             });
//     }

//     return (
//         <Modal
//             {...props}
//             size="lg"
//             aria-labelledby="contained-modal-title-vcenter"
//             centered
//         >
//             <Modal.Header closeButton>
//                 <Modal.Title id="contained-modal-title-vcenter">
//                     Edit Profile
//                 </Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Form>
//                     <Form.Group className="mb-3">
//                         <Form.Label htmlFor="firstName">First Name</Form.Label>
//                         <Form.Control id="firstName" name='firstName' value={userData.firstName} onChange={handleInputChange} />
//                     </Form.Group>
//                     <Form.Group className="mb-3">
//                         <Form.Label htmlFor="lastName">Last Name</Form.Label>
//                         <Form.Control id="lastName" name='lastName' value={userData.lastName} onChange={handleInputChange} />
//                     </Form.Group>
//                     <Form.Group className="mb-3">
//                         <Form.Label htmlFor="address">Adress</Form.Label>
//                         <Form.Control id="address" name='address' value={userData.address} onChange={handleInputChange} />
//                     </Form.Group>
//                     <Form.Group className="mb-3 text-area">
//                         <Form.Label htmlFor="description">Description</Form.Label>
//                         <Form.Control as="textarea" name='description' id="description"  value={userData.description} onChange={handleInputChange} />
//                     </Form.Group>
//                 </Form>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button type='submit' onClick={updateUser}>Save</Button>
//             </Modal.Footer>
//         </Modal>
//     );
// }

// export default EditProfileModal;


import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'; // Import Yup
import { useForm } from 'react-hook-form';


import "./editUserModal.css"
import userService from '../../services/userService';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// Create a Yup schema for validation
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
            // Populate the form fields when data is available
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
        } catch (error) {
            console.log(error);
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
                        <Form.Label htmlFor="firstName" >First Name</Form.Label>
                        <Form.Control id='firstName' {...register('firstName')} />
                        <Form.Text className="text-danger">{errors.firstName?.message}</Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="lastName" >Last Name</Form.Label>
                        <Form.Control id='lastName' {...register('lastName')} />
                        <Form.Text className="text-danger">{errors.lastName?.message}</Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="address" >Address</Form.Label>
                        <Form.Control id='address' {...register('address')} />
                        <Form.Text className="text-danger">{errors.address?.message}</Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3 text-area">
                        <Form.Label htmlFor="description" >Description</Form.Label>
                        <Form.Control id='description' as="textarea" {...register('description')} />
                        <Form.Text className="text-danger">{errors.description?.message}</Form.Text>
                    </Form.Group>
                    <Button type="submit">Save</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditProfileModal;