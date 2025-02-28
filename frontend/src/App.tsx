import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login/login' //Se importa el componente Login
import './App.css'
import Home from './pages/Home/home'

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />}/>
      </Routes>
    </Router>
  )
}

export default App