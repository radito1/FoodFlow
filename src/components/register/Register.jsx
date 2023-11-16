import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../login/login.css'
import { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import userService from '../../services/userService';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate('');

    const emailChangeHandler = (e) => {
        setEmail(e.target.value);
    };

    const usernameChangeHandler = (e) => {
        setUsername(e.target.value);
    };

    const passwordChangeHandler = (e) => {
        setPassword(e.target.value);
    };

    const saveUser = (uid) => {
        let data = {
            email: email,
            username: username,
            uid: uid,
        }
        userService.create(data, uid)
            .then(() => {
            })
            .catch(e => {
                console.log(e);
            });
    }

    const register = (e) => {
        e.preventDefault();

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                updateProfile(userCredential.user, { displayName: username })
                saveUser(userCredential.user.uid);
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className='form-container'>
            <h2>REGISTER</h2>
            <Form onSubmit={register}>
                <Form.Group className="mb-3" controlId="formGroupUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="username" value={username} onChange={usernameChangeHandler} placeholder="Enter username" />
                </Form.Group>
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