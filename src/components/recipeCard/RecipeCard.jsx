import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const RecipeCard = ({recipeName, recipeText}) => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>{recipeName}</Card.Title>
                <Card.Text>
                    {recipeText}
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    );
}

export default RecipeCard;