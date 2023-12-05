import { useEffect, useState } from 'react';

import "./editUserModal.css"
import userService from '../../services/userService';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


//TODO Data doesn't populate on inialial load
const EditProfileModal = (props) => {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        description: '',
    });

    useEffect(() => {
        setUserData(props.data);
    }, [props.data])

    const handleInputChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const updateUser = (e) => {
        e.preventDefault();

        let data = {
            firstName: userData.firstName,
            lastName: userData.lastName,
            address: userData.address,
            description: userData.description
        }

        userService.updateUserData(data, props.uid)
            .then(() => {
                props.onHide()
            })
            .catch(e => {
                console.log(e);
            });
    }

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
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="firstName">First Name</Form.Label>
                        <Form.Control id="firstName" name='firstName' value={userData.firstName} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="lastName">Last Name</Form.Label>
                        <Form.Control id="lastName" name='lastName' value={userData.lastName} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="address">Adress</Form.Label>
                        <Form.Control id="address" name='address' value={userData.address} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3 text-area">
                        <Form.Label htmlFor="description">Description</Form.Label>
                        <Form.Control as="textarea" name='description' id="description"  value={userData.description} onChange={handleInputChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button type='submit' onClick={updateUser}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditProfileModal;