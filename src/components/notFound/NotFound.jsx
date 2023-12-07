import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
const navigate = useNavigate();

const navigation = () => {
    navigate('/')
}

    return (
        <>
            <img alt="404"
                src='https://lh6.googleusercontent.com/Bu-pRqU_tWZV7O3rJ5nV1P6NjqFnnAs8kVLC5VGz_Kf7ws0nDUXoGTc7pP87tyUCfu8VyXi0YviIm7CxAISDr2lJSwWwXQxxz98qxVfMcKTJfLPqbcfhn-QEeOowjrlwX1LYDFJN' />
                <Button onClick={navigation}>
                    Back to home page!
                </Button>
        </>

    )
}

export default NotFound;