import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import dataService from '../../services/dataService';

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

        // TODO: this was making rendering problems. Test it again!
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top"  src={data.pictures}/>
            <Card.Body>
                <Card.Title>{data.recipeName}</Card.Title>
                <Card.Text>
                    {data.recipeText}
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>{data.recipeName}</ListGroup.Item>
                <ListGroup.Item>{data.time}</ListGroup.Item>
                
            </ListGroup>
            <Card.Body>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
        </Card>
    );
}

export default RecipeDetails;
