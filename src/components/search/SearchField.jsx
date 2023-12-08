import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const SearchField = () => {
    return (
        <Form className="d-flex">
            <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
        </Form>
    );
}

export default SearchField;