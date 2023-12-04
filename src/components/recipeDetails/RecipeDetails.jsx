import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import dataService from '../../services/dataService';
import styles from './recipeDetails.module.css'

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Button } from 'react-bootstrap';


const RecipeDetails = () => {
    const { id } = useParams();
    const [data, setData] = useState({});
    const { myRecipes } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await dataService.getById(id);
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id])
    return (
        <div className={styles['recipeDetails-container']}>
            <Card style={{ width: '25rem' }}>
                <Card.Img variant="top" src={data.recipePicture} />
                <Card.Body>
                    <Card.Title>{data.recipeName}</Card.Title>
                    <Card.Text>Preparation time: {data.time}</Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>{data.recipeText}</ListGroup.Item>
                </ListGroup>
                {myRecipes
                    ?
                    <div className={styles['buttons']}>
                        <Button variant="primary">Edit</Button>
                        <Button variant="danger">Delete</Button>
                    </div>
                    : ''
                }
            </Card>
        </div>
    );
}

export default RecipeDetails;
