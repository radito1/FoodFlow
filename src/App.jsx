import { Route, Routes } from "react-router-dom"
import Login from "./components/login/Login"
import Navigation from "./components/navigation/Navigation"
import Home from "./components/home/Home"
import Register from "./components/register/Register"
import Create from "./components/create/Create"
import Catalog from "./components/catalog/Catalog"
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase"
import UserProfile from "./components/userProfile/UserProfile"


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
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/create" element={<Create />} />
                <Route path="/my-recipes" element={<Catalog uid={authenticatedUser?.uid} />} />
                <Route path="/catalog/see-all" element={<Catalog all/>} />
                <Route path="/catalog/soups" element={<Catalog category={'Soups'} />} />
                <Route path="/my-profile" element={<UserProfile user={authenticatedUser}/>} />
            </Routes>
        </>
    )
}

export default App
