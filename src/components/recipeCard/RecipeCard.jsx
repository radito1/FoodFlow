import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

const RecipeCard = ({recipeName, recipeText}) => {
    const navigate = useNavigate('');

    const navigation =() => {
        navigate('/');
    }
    return (
        //TODO fix navigation to work properly
        <Card style={{ width: '18rem' }} onClick={navigation}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>{recipeName}</Card.Title>
                <Card.Text>
                    {recipeText}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default RecipeCard;