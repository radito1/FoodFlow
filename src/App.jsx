import { Route, Routes } from "react-router-dom"
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
                        <Route path="/user/catalog/:myRecipes" element={<Catalog userRecipes />} />
                        <Route path="/catalog/all-recipes" element={<Catalog all />} />
                        <Route path="/catalog/:category" element={<Catalog />} />
                        <Route path="/recipe/:id" element={<RecipeDetails />} />
                        <Route path="/user/catalog/:myRecipes/:id" element={<RecipeDetails />} />
                        <Route path="/my-profile" element={<UserProfile />} />
                    </Routes>
                </div>
            </AuthProvider>
        </>
    )
}

export default App
