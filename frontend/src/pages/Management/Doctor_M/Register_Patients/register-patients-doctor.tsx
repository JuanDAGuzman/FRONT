import React from "react";
import styles from "./register-patientes-doctor.module.css"
import { useNavigate } from "react-router-dom";
import Navbar_G from "../../../../components/NavBars/Navbar_Globla";

const Registro_Patient: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div className={styles.Registro_Patient}>

            <Navbar_G 
                profileText='Regresar'
                profilePath='/list-patients'
                profileImg='public/user.png'
                centerText='Nombre, Aca podras ver tus pacientes'
                menuItems={[]}
                onLogout={() => navigate('/Support_D')}
                logoutText='Soporte'
            />
        </div>
    )

}

export default Registro_Patient