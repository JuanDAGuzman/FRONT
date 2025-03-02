import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home/home'
import Login from './pages/Auth/Login/login' //Se importa el componente Login
import TwoFactor from './pages/Auth/TwoFactor/twoFactor'

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />}/>
        <Route path="twoFactor" element={<TwoFactor />}/>
      </Routes>
    </Router>
  )
}

export default App