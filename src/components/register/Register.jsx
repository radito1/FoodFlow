import { useNavigate } from 'react-router-dom';
import { useContext } from "react";

import styles from '../login/login.module.css';
import AuthContext from "../../contexts/authContext";
import useForm from "../../hooks/useForm";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const RegisterFormKeys = {
    Username: 'username',
    Email: 'email',
    Password: 'password',
};

const Register = () => {
    const navigate = useNavigate('');
    const { registerSubmitHandler } = useContext(AuthContext);
    const { values, onChange, onSubmit } = useForm(registerSubmitHandler, {
        [RegisterFormKeys.Username]: '',
        [RegisterFormKeys.Email]: '',
        [RegisterFormKeys.Password]: '',
    });

    const navigateLogin = () => {
        navigate('/login');
    }

    return (
        <div className={styles['form-container']}>
            <h2>Register</h2>
            <Form className={styles.form} onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formGroupUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="username"
                        name="username"
                        values={values[RegisterFormKeys.Username]}
                        onChange={onChange}
                        placeholder="Enter username"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        values={values[RegisterFormKeys.Email]}
                        onChange={onChange}
                        placeholder="Enter email"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        values={values[RegisterFormKeys.ConfirmPassword]}
                        onChange={onChange}
                        placeholder="Password"
                    />
                </Form.Group>
                <Form.Text className="text-muted">
                    Already have an account? <span className={styles.navigate} onClick={navigateLogin}>Login</span>.
                </Form.Text>
                <div className={styles['button-container']}>
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default Register;