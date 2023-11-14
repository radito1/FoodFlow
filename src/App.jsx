import { Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import Navigation from "./components/Navigation"
import Home from "./components/Home"
import Register from "./components/Register"
import Create from "./components/create/Create"
import RecipeCard from "./components/recipeCard/RecipeCard"


const App = () => {

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<Create />} />
        <Route path="/catalog/see-all" element={<RecipeCard />} />            
      </Routes>
    </>
  )
}

export default App
