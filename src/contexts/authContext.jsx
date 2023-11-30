import { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

import userService from "../services/userService";

const AuthContext = createContext();

export const AuthProvider = ({
    children,
}) => {
    const navigate = useNavigate();
    const [authenticatedUser, setAuthenticatedUser] = useState({});

    useEffect(() => {
        const listenAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthenticatedUser(user)
            } else {
                setAuthenticatedUser({})
            }
        })

        return () => {
            listenAuth();
        }
    }, []);

    const loginSubmitHandler = async (values) => {
        const auth = getAuth();

        return signInWithEmailAndPassword(auth, values.email, values.password)
            .then(data => {
                setAuthenticatedUser(data.user)
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
                setAuthenticatedUser(userCredential.user);
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const logoutHandler = () => {
        signOut(auth)
            .then(() => {
                setAuthenticatedUser({})
            })
            .catch(error => console.log(error));
    };

    const values = {
        loginSubmitHandler,
        registerSubmitHandler,
        logoutHandler,
        username: authenticatedUser.displayName || authenticatedUser.email,
        email: authenticatedUser.email,
        userId: authenticatedUser.uid,
        isAuthenticated: !!authenticatedUser.accessToken,
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};

AuthContext.displayName = 'AuthContext';

export default AuthContext;