import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import "./editUserModal.css"

const EditProfileModal = (props) => {
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
                        <Form.Control id="first-name" value="Radoslav" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="disabledTextInput">Last Name</Form.Label>
                        <Form.Control id="last-name" value="Kehadzhiyski" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="disabledTextInput">Adress</Form.Label>
                        <Form.Control id="address" value="addressa mi"/>
                    </Form.Group>
                    <Form.Group className="mb-3 text-area">
                        <Form.Label htmlFor="disabledTextInput">Description</Form.Label>
                        <Form.Control as="textarea" id="description" value="Some description" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditProfileModal;