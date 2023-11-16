import { Route, Routes } from "react-router-dom"
import Login from "./components/login/Login"
import Navigation from "./components/navigation/Navigation"
import Home from "./components/home/Home"
import Register from "./components/register/Register"
import Create from "./components/create/Create"
import Catalog from "./components/catalog/Catalog"


const App = () => {

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<Create />} />
        <Route path="/catalog/see-all" element={<Catalog />} />            
        <Route path="/catalog/soups" element={<Catalog category={'Soups'} />} />            
      </Routes>
    </>
  )
}

export default App
