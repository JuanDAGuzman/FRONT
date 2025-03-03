import React from 'react'
import styles from "./dashboard-doctor.module.css" // Importar estilos de Login modules
import { useNavigate } from "react-router-dom";

const Ddoctor: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div className={styles.DashDoctor}>
            <nav className={styles.navbar}>
                <ul>
                    <li>Perfil</li>
                    <li>Configuraciones</li>
                </ul>
                <button type='submit' className={styles.salir} onClick={() => navigate("/")}> Cerrar Sesión </button>
            </nav>
            <div className={styles.container}>
            
            </div>
        </div>
    )
}

export default Ddoctor