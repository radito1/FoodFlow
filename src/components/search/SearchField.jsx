import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
    searchTerm: yup.string().required('Search cannot be empty!'),
});

const SearchField = () => {
    const navigate = useNavigate();
    const { control,setValue, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        navigate(`/search/${data.searchTerm}`);
        setValue('searchTerm', '');
    };

    return (
        <Form className="d-flex" onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="searchTerm"
                control={control}
                defaultValue=""
                render={({ field, fieldState }) => (
                    <>
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className={`${fieldState.invalid ? 'is-invalid' : ''}`}
                            aria-label="Search"
                            {...field}
                        />
                        {fieldState.invalid && (
                            <Form.Control.Feedback type="invalid">
                                {fieldState?.error?.message}
                            </Form.Control.Feedback>
                        )}
                    </>
                )}
            />
            <Button type="submit" variant="outline-success">
                Search
            </Button>
        </Form>
    );
}

export default SearchField;