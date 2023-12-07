import { Route, Routes } from "react-router-dom"
import { AuthProvider } from "./contexts/authContext";

import style from './main.module.css';
import 'react-toastify/dist/ReactToastify.css';

import Login from "./components/login/Login"
import Navigation from "./components/navigation/Navigation"
import Home from "./components/home/Home"
import Register from "./components/register/Register"
import Create from "./components/create/Create"
import Catalog from "./components/catalog/Catalog"
import UserProfile from "./components/userProfile/UserProfile"
import RecipeDetails from "./components/recipeDetails/RecipeDetails"
import Footer from "./components/footer/Footer";
import { ToastContainer } from "react-toastify";

const App = () => {
    return (
        <>
            <ToastContainer />
            <AuthProvider>
                <div className={style['main-container']}>
                    <Navigation />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/add-recipe" element={<Create />} />
                        <Route path="/user/catalog/:myRecipes" element={<Catalog userRecipes />} />
                        <Route path="/catalog/all-recipes" element={<Catalog all />} />
                        <Route path="/catalog/:category" element={<Catalog />} />
                        <Route path="/recipe/:id" element={<RecipeDetails />} />
                        <Route path="/user/catalog/:myRecipes/:id" element={<RecipeDetails />} />
                        <Route path="/my-profile" element={<UserProfile />} />
                    </Routes>
                    <Footer />
                </div>
            </AuthProvider>
        </>
    )
}

export default App
