import React from "react";
import styles from "./roles-admin.module.css";
import { useNavigate } from "react-router-dom";
import Navbar_G from "../../../../components/NavBars/Navbar_Globla";
import Table from "../../../../components/Data_tables/Data_table_Rol_List"

const Manage_roles: React.FC = () => {
    const navigate = useNavigate();

    

    return (
        <div className={styles.Manage_roles}>
            {/* Barra de navegación */}
            <Navbar_G
                profileText="Regresar"
                profilePath="/dashboard_admin"
                profileImg="public/user.png"
                centerText="Gestión de Roles"
                menuItems={[{ label: "Configuraciones", path: "/" }]}
                onLogout={() => navigate("/")}
            />
             <div style={{ padding: '20px' }}>
                <Table />
            </div>
        </div>
    );
};

export default Manage_roles;
