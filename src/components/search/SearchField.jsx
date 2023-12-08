import { useForm, Controller } from 'react-hook-form';

import styles from './searchField.module.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

const SearchField = () => {
    const navigate = useNavigate();
    const { control, setValue, handleSubmit } = useForm();

    const onSubmit = (data) => {
        if (data.searchTerm === '') {
            return
        }

        navigate(`/search/${data.searchTerm}`);
        setValue('searchTerm', '');
    };

    return (
        <Form className="d-flex" onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="searchTerm"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <>
                        <Form.Control
                            type="search"
                            placeholder="E.g. Burger,Soup"
                            aria-label="Search"
                            {...field}
                        />
                    </>
                )}
            />
            <Button className={styles['search-button']} type="submit" variant="outline-success">
                Search
            </Button>
        </Form>
    );
}

export default SearchField;