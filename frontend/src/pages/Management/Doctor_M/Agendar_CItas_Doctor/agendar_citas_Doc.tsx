import React from 'react';
import styles from './agendar_citas_Doc.module.css';
import { useNavigate } from 'react-router-dom';
import Navbar_G from '../../../../components/NavBars/Navbar_Globla';

const agendarcita_doc: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.List_Patients_Doc}>
      <Navbar_G
        profileText="Regresar"
        profilePath="/dashboard_doctor"
        profileImg="public/user.png"
        centerText="Nombre, Aca podras gestionar las citas de tus pacientes"
        menuItems={[]}
        onLogout={() => navigate('/Support_D')}
        logoutText="Soporte"
      />

      {/* Imagen medicos */}
      <img
        src="../../../../public/logo_medicos2.png"
        alt="Logo medicos"
        className={styles.logo}
      />
    </div>
  );
};

export default agendarcita_doc;
