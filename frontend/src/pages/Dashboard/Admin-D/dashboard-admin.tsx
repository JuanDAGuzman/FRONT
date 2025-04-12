import React from "react";
import styles from "./dashboard-admin.module.css";
import { useNavigate } from "react-router-dom";
import Navbar_G from '../../../components/NavBars/Navbar_Globla';

const DashAdmin: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.DashAdmin}>
        <Navbar_G 
            profileText='Perfil'
            profileImg='public/user.png'
            centerText='¡Bienvenido, Nombre!'
            menuItems={[{label: "Configuraciones", path: "/"}]}
            onLogout={()  => navigate('/login')}
        />

        <h1 className={styles.title}> Aca podras ver todo lo que necesitas </h1>
        
        <div className={styles.container}>
                
            
                <div className={styles.sidebar}>
                    <h1 className={styles.subtitle}> Menú </h1>
                    <button type='submit' className={styles.button} onClick={() => navigate("/user_list_admin")}> Usuarios </button>
                    <button type='submit' className={styles.button} onClick={() => navigate("/manage_roles")}> Roles </button>
                    <button type='submit' className={styles.button} onClick={() => navigate("/notifications_admin")}> Notificaciones </button>
                </div>


                <div className={styles.statsPanel}>
                    <h2 className={styles.statsTitle}>📊 Panel de Estadísticas Generales</h2>
                    
                    <div className={styles.statsGrid}>
                        <div className={`${styles.statCard} ${styles.totalPacientes}`}>
                            <h3>Total de Pacientes Registrados</h3>
                            <p>1,250</p>
                        </div>
                        <div className={`${styles.statCard} ${styles.pacientesActivos}`}>
                            <h3>Pacientes Activos</h3>
                            <p>850</p>
                        </div>
                        <div className={`${styles.statCard} ${styles.pacientesInactivos}`}>
                            <h3>Pacientes Inactivos</h3>
                            <p>400</p>
                        </div>
                        <div className={`${styles.statCard} ${styles.medicosRegistrados}`}>
                            <h3>Médicos Registrados</h3>
                            <p>75</p>
                        </div>
                        <div className={`${styles.statCard} ${styles.centrosSalud}`}>
                            <h3>Centros de Salud Afiliados</h3>
                            <p>12</p>
                        </div>
                        <div className={`${styles.statCard} ${styles.alertasRiesgo}`}>
                            <h3>Alertas de Alto Riesgo</h3>
                            <p>5</p>
                        </div>
                    </div>
                </div>
        </div>
    </div>
    );
};

export default DashAdmin;
