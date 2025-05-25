import React from "react";
import styles from "./dashboard-admin.module.css";
import { Link } from "react-router-dom";
import Navbar_G from '../../../components/NavBars/Navbar_Globla';
import { useNavigate } from "react-router-dom";
import ActionCard from "../../../components/Cards/action_cards";
import { FaUsers, FaUserShield, FaBell } from "react-icons/fa";  // Cambié los íconos aquí

const DashAdmin: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.DashAdmin}>
            <Navbar_G
                profileText='Perfil'
                profileImg='public/user.png'
                centerText='¡Bienvenido, Nombre!'
                menuItems={[{ label: "Configuraciones", path: "/" }]}
                onLogout={() => { navigate('/login'); }}
            />

            <h1 className={styles.title}>Aca podrás ver todo lo que necesitas</h1>

            <div className={styles.container}>
                <div className={styles.cardsContainer}>
                    <ActionCard
                        icon={<FaUsers />}
                        title="Usuarios"
                        onClick={() => navigate('/user_list_admin')}
                    />
                    <ActionCard
                        icon={<FaUserShield />}
                        title="Roles"
                        onClick={() => navigate('/manage_roles')}
                    />
                    <ActionCard
                        icon={<FaBell />}
                        title="Notificaciones"
                        onClick={() => navigate('/notifications_admin')}
                    />
                </div>

                <div className={styles.statsPanel}>
                    

                    <div className={styles.statsGrid}>
                        {[ 
                            { title: "Total de Pacientes Registrados", value: "1,250", to: "/" },
                            { title: "Pacientes Activos", value: "850", to: "/" },
                            { title: "Pacientes Inactivos", value: "400", to: "/" },
                            { title: "Médicos Registrados", value: "75", to: "/" },
                            { title: "Centros de Salud Afiliados", value: "12", to: "/health_center_list" },
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
