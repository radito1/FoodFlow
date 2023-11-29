import { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase"
import { AuthProvider } from "./contexts/authContext";

import style from './main.module.css';

import Login from "./components/login/Login"
import Navigation from "./components/navigation/Navigation"
import Home from "./components/home/Home"
import Register from "./components/register/Register"
import Create from "./components/create/Create"
import Catalog from "./components/catalog/Catalog"
import UserProfile from "./components/userProfile/UserProfile"
import RecipeDetails from "./components/recipeDetails/RecipeDetails"



const App = () => {
    const [authenticatedUser, setAuthenticatedUser] = useState('');

    useEffect(() => {
        const listenAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthenticatedUser(user)
                console.log(authenticatedUser)
            } else {
                setAuthenticatedUser(null)
            }
        })

        return () => {
            listenAuth();
        }
    }, []);

    return (
        <>
            <AuthProvider>
                <Navigation />
                <div className={style['main-container']}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/create" element={<Create />} />
                        <Route path="/my-recipes" element={<Catalog uid={authenticatedUser?.uid} />} />
                        <Route path="/catalog/all-recipes" element={<Catalog all />} />
                        <Route path="/catalog/:category" element={<Catalog />} />
                        <Route path="/recipe/:id" element={<RecipeDetails />} />
                        <Route path="/my-profile" element={<UserProfile user={authenticatedUser} />} />
                    </Routes>
                </div>
            </AuthProvider>
        </>
    )
}

export default App
