import { createContext, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import userService from "../services/userService";

const AuthContext = createContext();

export const AuthProvider = ({
    children,
}) => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState({});

    const loginSubmitHandler = async (values) => {
        const auth = getAuth();

        return signInWithEmailAndPassword(auth, values.email, values.password)
            .then(data => {
                setAuth(data.user)
                navigate('/')
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const registerSubmitHandler = async (values) => {
        const auth = getAuth();

        const saveUser = (uid) => {
            let data = {
                email: values.email,
                username: values.username,
                uid: uid,
            }
            userService.create(data, uid)
                .then(() => {
                })
                .catch(e => {
                    console.log(e);
                });
        }


        createUserWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                updateProfile(userCredential.user, { displayName: values.username })
                saveUser(userCredential.user.uid);
                setAuth(userCredential.user)
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const logoutHandler = () => {
        setAuth({});
        localStorage.removeItem('accessToken');
    };

    const values = {
        loginSubmitHandler,
        registerSubmitHandler,
        logoutHandler,
        username: auth.displayName || auth.email,
        email: auth.email,
        userId: auth.uid,
        isAuthenticated: !!auth.accessToken,
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};

AuthContext.displayName = 'AuthContext';

export default AuthContext;