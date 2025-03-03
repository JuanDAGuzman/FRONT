import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home/home'
import Login from './pages/Auth/Login/login' //Se importa el componente Login
import TwoFactor from './pages/Auth/TwoFactor/twoFactor'
import Doctor_D from './pages/Dashboard/Doctor_D/dashboard-doctor'

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />}/>
        <Route path="twoFactor" element={<TwoFactor />}/>
        <Route path="dashboard-doctor" element={<Doctor_D />}/>
      </Routes>
    </Router>
  )
}

export default App