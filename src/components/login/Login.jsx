import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './login.css'
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate('');

    const signIn = (e) => {
        e.preventDefault();

        const auth = getAuth();
        return signInWithEmailAndPassword(auth, email, password)
            .then(navigate('/'))
            .catch((error) => {
                console.log(error);
            });
    }

    const navigateRegister =() => {
        navigate('/register')
    }

    return (
        <div className='form-container'>
            <h2>Login</h2>
            <Form onSubmit={signIn}>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                </Form.Group>
                <Form.Text className="text-muted">
                    Don't have an account yet? <span className='register-navigate' onClick={navigateRegister}>Register now</span>.
                </Form.Text>
                <div className='button-container'>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </div>

            </Form>
        </div>

    );
}

export default Login;