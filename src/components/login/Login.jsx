import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './login.module.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import useForm from '../../hooks/useForm';
import AuthContext from '../../contexts/authContext';

const LoginFormKyes = {
    Email: 'email',
    Password: 'password',
};

const Login = () => {
    const navigate = useNavigate('');
    const { loginSubmitHandler } = useContext(AuthContext);
    const { values, onChange, onSubmit } = useForm(loginSubmitHandler, {
        [LoginFormKyes.Email]: '',
        [LoginFormKyes.Password]: '',
    });

    const navigateRegister = () => {
        navigate('/register')
    }

    return (
        <div className={styles['form-container']}>
            <h2>Login</h2>
            <Form className={styles.form} onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        name={LoginFormKyes.Email}
                        value={values[LoginFormKyes.Email]}
                        onChange={onChange}
                        placeholder="Enter email"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name={LoginFormKyes.Password}
                        onChange={onChange}
                        value={values[LoginFormKyes.Password]}
                        placeholder="Password"
                    />
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
}

export default Login;