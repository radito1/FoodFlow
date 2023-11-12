import { Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import Navigation from "./components/Navigation"
import Home from "./components/Home"

const App = () => {

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
