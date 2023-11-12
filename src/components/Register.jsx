import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from './Login.module.css'
import { useState } from 'react';
import { app, auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const register = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        
            .then((userCredential) => {
                // Signed in 
                console.log(userCredential)
                // ...
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const emailChangeHandler = (e) => {
        setEmail(e.target.value);
    };

    const passwordChangeHandler = (e) => {
        setPassword(e.target.value);
    };

    
    return (
        <div className={styles['form-container']}>
            <h2>REGISTER</h2>
            <Form onSubmit={register}>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" value={email} onChange={emailChangeHandler} placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={passwordChangeHandler} placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit"> 
                    Register
                </Button>
            </Form>
        </div>

    );
}

export default Register;