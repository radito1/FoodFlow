import Form from 'react-bootstrap/Form';

function TextControlsExample() {
    return (
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
    );
}

export default TextControlsExample;