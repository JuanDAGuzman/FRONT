import React from "react";
import styles from "./dashboard-admin.module.css";
import { Link } from "react-router-dom";
import Navbar_G from '../../../components/NavBars/Navbar_Globla';
import { useNavigate } from "react-router-dom";

const DashAdmin: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.DashAdmin}>
            <Navbar_G 
                profileText='Perfil'
                profileImg='public/user.png'
                centerText='¡Bienvenido, Nombre!'
                menuItems={[{label: "Configuraciones", path: "/"}]}
                onLogout={() => { navigate('/login'); }}

            />

            <h1 className={styles.title}>Aca podrás ver todo lo que necesitas</h1>

            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <h1 className={styles.subtitle}>Menú</h1>
                    <Link to="/user_list_admin" className={styles.button}>Usuarios</Link>
                    <Link to="/manage_roles" className={styles.button}>Roles</Link>
                    <Link to="/notifications_admin" className={styles.button}>Notificaciones</Link>
                </div>

                <div className={styles.statsPanel}>
                    <h2 className={styles.statsTitle}>📊 Panel de Estadísticas Generales</h2>

                    <div className={styles.statsGrid}>
                        {[
                            { title: "Total de Pacientes Registrados", value: "1,250", to: "/" },
                            { title: "Pacientes Activos", value: "850", to: "/" },
                            { title: "Pacientes Inactivos", value: "400", to: "/" },
                            { title: "Médicos Registrados", value: "75", to: "/" },
                            { title: "Centros de Salud Afiliados", value: "12", to: "/" },
                            { title: "Alertas de Alto Riesgo", value: "5", to: "/notifications_admin" },
                        ].map((stat, idx) => (
                            <Link to={stat.to} key={idx} className={`${styles.statCard}`}>
                                <h3>{stat.title}</h3>
                                <p>{stat.value}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashAdmin;
