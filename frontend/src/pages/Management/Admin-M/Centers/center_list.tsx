import React from "react";
import styles from "./center_list.module.css";
import { useNavigate } from "react-router-dom";
import Navbar_G from '../../../../components/NavBars/Navbar_Globla';
import Table from '../../../../components/Data_tables/Data_Table_Health';





const HealterCenter_list: React.FC = () => {
    const navigate = useNavigate();

    return (

        <div className={styles.healtCenter_list}>
            <Navbar_G
                profileText='Perfil'
                profileImg='public/user.png'
                centerText='¡Bienvenido, Nombre!'
                menuItems={[{ label: "Configuraciones", path: "/" }]}
                onLogout={() => navigate('/login')}
            />


            <div style={{ padding: '20px' }}>
                <Table />
            </div>

        </div>




    )

};

export default HealterCenter_list