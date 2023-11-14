import Form from 'react-bootstrap/Form';
import styles from './Create.module.css'

function Create() {
    return (
        <div className={styles['form-container']}>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Recipe</Form.Label>
                    <Form.Control type="email" placeholder="musaka" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Recipe text</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
            </Form>
        </div>
    );
}

export default Create;