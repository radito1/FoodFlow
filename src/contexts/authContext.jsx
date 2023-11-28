import { createContext, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
            navigate('/')})
            .catch((error) => {
                console.log(error);
            });
    };

    const registerSubmitHandler = async (values) => {
        // const result = await authService.register(values.email, values.password);

        setAuth(result);


        navigate(Path.Home);
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