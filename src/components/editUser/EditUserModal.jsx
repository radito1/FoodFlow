import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import "./editUserModal.css"
import { useState } from 'react';
import userService from '../../services/userService';

const EditProfileModal = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');

    const updateUser = (e) => {
        e.preventDefault();

        let data = {
            firstName: firstName,
            lastName: lastName,
            address: address,
            description: description
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
                        <Form.Label htmlFor="disabledTextInput">First Name</Form.Label>
                        <Form.Control id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="disabledTextInput">Last Name</Form.Label>
                        <Form.Control id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="disabledTextInput">Adress</Form.Label>
                        <Form.Control id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3 text-area">
                        <Form.Label htmlFor="disabledTextInput">Description</Form.Label>
                        <Form.Control as="textarea" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
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