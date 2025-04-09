import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home/home';
import Login from './pages/Auth/Login/login' //Se importa el componente Login
import TwoFactor from './pages/Auth/TwoFactor/twoFactor'
import Doctor_D from './pages/Dashboard/Doctor_D/dashboard-doctor'
import Doctor_M_l from './pages/Management/Doctor_M/Patients-List/list-patients-doctor'
import Doctor_M_R from './pages/Management/Doctor_M/Register_Patients/register-patients-doctor'
import Us from "./pages/Us/Us";
import Support from "./pages/Support/Support";
import Contact from "./pages/Contact/Contact";
import Support_D from "./pages/Support_Doctor/Support_D";
import Admin_D from "./pages/Dashboard/Admin-D/dashboard-admin";
import Roles_Admin from "./pages/Management/Admin-M/G-Roles/roles-admin";




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="twoFactor" element={<TwoFactor />} />
        <Route path="dashboard_doctor" element={<Doctor_D />} />
        <Route path="list_patients_doctor" element={<Doctor_M_l />} />
        <Route path="register_patients_doctor" element={<Doctor_M_R />} />
        <Route path="dashboard-admin" element={<Admin_D />} />
        <Route path="Manage_roles_admin" element={<Roles_Admin />} />
        <Route path="Us" element={<Us />} />
        <Route path="Support" element={<Support />} />
        <Route path="Support_D" element={<Support_D />} />
        <Route path="Contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App