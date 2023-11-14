import Form from 'react-bootstrap/Form';
import styles from './Create.module.css';
import dataService from '../../services/dataService';
import { Button } from 'react-bootstrap';
import { useState } from 'react';

function Create() {
    const initialState = {
        recipeName: '',
        recipeText: '',
    };
    const [tutorial, setTutorial] = useState(initialState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTutorial({ ...tutorial, [name]: value });
    };

    const saveTutorial = () => {

        let data = {
            recipeName: tutorial.recipeName,
            recipeText: tutorial.recipeText
        };

        dataService.create(data)
            .then(() => {
                setSubmitted(true);
            })
            .catch(e => {
                console.log(e);
            });
    };

    // const newTutorial = () => {
    //     setTutorial(initialTutorialState);
    //     setSubmitted(false);
    // };

    return (
        <div className={styles['form-container']}>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Recipe</Form.Label>
                    <Form.Control type="text" value={tutorial.recipeName}
                        onChange={handleInputChange}
                        name="recipeName" placeholder="musaka" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Recipe text</Form.Label>
                    <Form.Control as="textarea" value={tutorial.recipeText}
                        onChange={handleInputChange}
                        name="recipeText" rows={3} />
                </Form.Group>
                <Button variant="primary" onClick={saveTutorial}>
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default Create;