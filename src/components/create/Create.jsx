import Form from 'react-bootstrap/Form';
import dataService from '../../services/dataService';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import './create.css'

function Create() {
    const initialState = {
        recipeName: '',
        recipeText: '',
        category: '',
    };
    const [recipe, setRecipe] = useState(initialState);
    const [authenticatedUser, setAuthenticatedUser] = useState('');
    const navigate = useNavigate('');

    useEffect(() => {
        const listenAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthenticatedUser(user)
            } else {
                navigate('/');
            }
        })

        return () => {
            listenAuth();
        }
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRecipe({ ...recipe, [name]: value });
    };

    const handleCategoryChange = (e) => {
        const { value } = e.target;
        setRecipe({ ...recipe, category: value });
    };

    const saveRecipe = () => {
        let data = {
            recipeName: recipe.recipeName,
            recipeText: recipe.recipeText,
            category: recipe.category,
            owner: authenticatedUser.uid
        };
        
        dataService.create(data)
            .then(() => {
                navigate('/')
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div className='form-container'>
            <Form className='form'>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Recipe</Form.Label>
                    <Form.Control type="text"
                        value={recipe.recipeName}
                        onChange={handleInputChange}
                        name="recipeName"
                        placeholder="musaka" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Recipe text</Form.Label>
                    <Form.Control as="textarea"
                        value={recipe.recipeText}
                        onChange={handleInputChange}
                        name="recipeText" rows={3} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Select aria-label="Default select example" onChange={handleCategoryChange} value={recipe.category}>
                        <option>Select Category</option>
                        <option>Burgers/Sandwitches</option>
                        <option>Soups</option>
                        <option>Chicken</option>
                    </Form.Select>
                </Form.Group>
                <Button variant="primary" onClick={saveRecipe}>
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default Create;