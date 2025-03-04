import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home/home';
import Login from './pages/Auth/Login/login' //Se importa el componente Login
import TwoFactor from './pages/Auth/TwoFactor/twoFactor'
import Doctor_D from './pages/Dashboard/Doctor_D/dashboard-doctor'
import Doctor_M from './pages/Management/Doctor_M/list-patients-doctor'

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />}/>
        <Route path="twoFactor" element={<TwoFactor />}/>
        <Route path="dashboard-doctor" element={<Doctor_D />}/>
        <Route path="list_patients" element={<Doctor_M />}/>
      </Routes>
    </Router>
  )
}

export default App