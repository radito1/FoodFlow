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
        time: '',
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

    const handleTimeChange = (e) => {
        const { value } = e.target;
        setRecipe({ ...recipe, time: value });
    };

    const saveRecipe = () => {
        let data = {
            recipeName: recipe.recipeName,
            recipeText: recipe.recipeText,
            category: recipe.category,
            time: recipe.time,
            owner: authenticatedUser.uid,
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
                <Form.Group className="mb-3">
                    <Form.Select aria-label="Default select example" onChange={handleCategoryChange} value={recipe.category}>
                        <option>Select Category</option>
                        <option>Burgers/Sandwitches</option>
                        <option>Soups</option>
                        <option>Chicken</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Select aria-label="Default select example" onChange={handleTimeChange} value={recipe.time}>
                        <option>Select preparation time</option>
                        <option>less then 15min</option>
                        <option>15min</option>
                        <option>30min</option>
                        <option>45min</option>
                        <option>1hour</option>
                        <option>1h:15min</option>
                        <option>1h:30min</option>
                        <option>1h:45min</option>
                        <option>2hours</option>
                        <option>more then 2 hours</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Recipe text</Form.Label>
                    <Form.Control as="textarea"
                        value={recipe.recipeText}
                        onChange={handleInputChange}
                        name="recipeText" rows={3} />
                </Form.Group>
                <Button variant="primary" onClick={saveRecipe}>
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default Create;