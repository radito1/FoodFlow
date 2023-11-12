import { Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import Navigation from "./components/Navigation"
import Home from "./components/Home"
import Register from "./components/Register"

const App = () => {

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
