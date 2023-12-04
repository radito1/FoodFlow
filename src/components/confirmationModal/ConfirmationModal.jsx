import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ConfirmationModal = (props) => {
    const handleClose = () => props.onHide();

    return (
        <>
            <Modal show={props.show} onHide={handleClose} animation={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to delete this recipe?</Modal.Title>
                </Modal.Header>
                <Modal.Body>By clicking "Delete" this recipe and all related data will be removed!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={props.delete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ConfirmationModal;