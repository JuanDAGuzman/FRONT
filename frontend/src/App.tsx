import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/home';
import Login from './pages/Auth/Login/login'; //Se importa el componente Login
import TwoFactor from './pages/Auth/TwoFactor/twoFactor';
import Profile_D from './pages/Profiles/Profile_Doctor/profile_D';
import Patient_D from './pages/Dashboard/Patient-D/dashboard-patient';
import Doctor_D from './pages/Dashboard/Doctor_D/dashboard_doctor';
import Doctor_M_l from './pages/Management/Doctor_M/Patients-List/list-patients-doctor';
import Doctor_M_R from './pages/Management/Doctor_M/Register_Patients/register-patients-doctor';
import Us from './pages/Us/Us';
import Support from './pages/Support/Support';
import Contact from './pages/Contact/Contact';
import Support_D from './pages/Support_Doctor/Support_D';
import Admin_D from './pages/Dashboard/Admin-D/dashboard-admin';
import Roles_Admin from './pages/Management/Admin-M/G-Roles/roles-admin';
import Users_Admin from './pages/Management/Admin-M/Users-List/list-users-admin';
import Notifications_Admin from './pages/Notifications/Admin-N/notifications-admin';
import Register_Doctor from './pages/Management/Admin-M/Register_D/register-doctor';
import Agendarcita_doc from './pages/Management/Doctor_M/Agendar_CItas_Doctor/agendar_citas_Doc';
import Register_HealthCenter from './pages/Management/Admin-M/Centers/register_center';
import HealterCenter_list from './pages/Management/Admin-M/Centers/center_list';
import List_patients_admin from './pages/Management/Admin-M/Users-List/list-user-admin-patient';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="twoFactor" element={<TwoFactor />} />
        <Route path="profile_D" element={<Profile_D />} />
        <Route path="dashboard_patient" element={<Patient_D />} />
        <Route path="dashboard_doctor" element={<Doctor_D />} />
        <Route path="list_patients_doctor" element={<Doctor_M_l />} />
        <Route path="register_patients_doctor" element={<Doctor_M_R />} />
        <Route path="agendar_cita_Doc" element={<Agendarcita_doc />} />
        <Route path="dashboard_admin" element={<Admin_D />} />
        <Route path="manage_roles" element={<Roles_Admin />} />
        <Route path="user_list_admin" element={<Users_Admin />} />
        <Route path="notifications_admin" element={<Notifications_Admin />} />
        <Route path="register_doctor_admin" element={<Register_Doctor />} />
        <Route
          path="register_healthcenter"
          element={<Register_HealthCenter />}
        />
        <Route path="health_center_list" element={<HealterCenter_list />} />
        <Route path="patient_list_admin" element={<List_patients_admin />} />
        <Route path="Us" element={<Us />} />
        <Route path="Support" element={<Support />} />
        <Route path="Support_D" element={<Support_D />} />
        <Route path="Contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
