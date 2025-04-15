import React from "react";
import styles from "./list-users-admin.module.css";
import { useNavigate } from "react-router-dom";
import Navbar_G from '../../../../components/NavBars/Navbar_Globla';

const Users_Admin: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.User_List}>
            <Navbar_G
                profileText="Regresar"
                profilePath="/dashboard_admin"
                profileImg="public/user.png"
                centerText='¡Bienvenido, Nombre!'
                menuItems={[{ label: "Configuraciones", path: "/" }]}
                onLogout={() => navigate('/login')}
            />

            <div className={styles.container}>
                <div className={styles.mainContent}>
                    <button
                        type="button"
                        className={styles.button}
                        onClick={() => navigate("/register_doctor_admin")}
                    >
                        Registrar Doctor
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Users_Admin;
