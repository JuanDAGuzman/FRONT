import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home/home';
import Login from './pages/Auth/Login/login' //Se importa el componente Login
import TwoFactor from './pages/Auth/TwoFactor/twoFactor'
import Doctor_D from './pages/Dashboard/Doctor_D/dashboard-doctor'
import Doctor_M from './pages/Management/Doctor_M/Patients-List/list-patients-doctor'
import Us from "./pages/Us/Us";
import Support from "./pages/Support/Support";
import Contact from "./pages/Contact/Contact";
import Support_D from "./pages/Support_Doctor/Support_D";
import DashAdmin from "./pages/Dashboard/Admin-D/dashboard-admin";
import Roles_Admin from "./pages/Management/Admin-M/G-Roles/roles-admin";




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="twoFactor" element={<TwoFactor />} />
        <Route path="dashboard-doctor" element={<Doctor_D />} />
        <Route path="list_patients" element={<Doctor_M />} />
        <Route path="Us" element={<Us />} />
        <Route path="Support" element={<Support />} />
        <Route path="Support_D" element={<Support_D />} />
        <Route path="Contact" element={<Contact />} />
        <Route path="dashboard-admin" element={<DashAdmin />} />
        <Route path="Manage-roles" element={<Roles_Admin />} />
      </Routes>
    </Router>
  );
}

export default App