import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import styles from './login.module.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AuthContext from '../../contexts/authContext';

const LoginFormKeys = {
    Email: 'email',
    Password: 'password',
};

const schema = yup.object().shape({
    [LoginFormKeys.Email]: yup.string().email('Invalid email').required('Email is required'),
    [LoginFormKeys.Password]: yup.string().min(6,'Password must be atleast 6 characters long').required('Password is required'),
});

const Login = () => {
    const navigate = useNavigate('');
    const { loginSubmitHandler } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        loginSubmitHandler(data);
    };

    const navigateRegister = () => {
        navigate('/register');
    };

    return (
        <div className={styles['form-container']}>
            <h2>Login</h2>
            <Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        {...register(LoginFormKeys.Email)}
                        placeholder="Enter email"
                    />
                    <Form.Text className="text-danger">{errors[LoginFormKeys.Email]?.message}</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        {...register(LoginFormKeys.Password)}
                        placeholder="Password"
                    />
                    <Form.Text className="text-danger">{errors[LoginFormKeys.Password]?.message}</Form.Text>
                </Form.Group>
                <Form.Text className="text-muted">
                    Already a registered user? <span className={styles.navigate} onClick={navigateRegister}>Register now</span>.
                </Form.Text>
                <div className={styles['button-container']}>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default Login;