import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import dataService from '../../services/dataService';
import styles from './recipeDetails.module.css'

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const RecipeDetails = () => {
    const { id } = useParams();
    const [data, setData] = useState({});

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
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={data.recipePicture} />
                <Card.Body>
                    <Card.Title>{data.recipeName}</Card.Title>
                    <Card.Text>Preparation time: {data.time}</Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>{data.recipeText}</ListGroup.Item>
                </ListGroup>
            </Card>
        </div>
    );
}

export default RecipeDetails;
