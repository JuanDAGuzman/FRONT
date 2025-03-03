import React from 'react'
import styles from "./dashboard-doctor.module.css" // Importar estilos de Login modules
import { useNavigate } from "react-router-dom";

const Ddoctor: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div className={styles.DashDoctor}>
            <nav className={styles.navbar}>
                <ul>
                    <li className={styles.profile}>
                        <img  
                            src="public/user.png" 
                            alt="Foto de perfil" 
                            className={styles.img}
                        />
                        Perfil
                    </li>
                    <li>Configuraciones</li>
                </ul>
                <div className={styles.button}>
                <button type='submit' className={styles.salir} onClick={() => navigate("/")}> Cerrar Sesión </button>
                </div>
            </nav>
            <div className={styles.container}>
            <h1 className={styles.title}>Vamos a hacer esto</h1>
            </div>
        </div>
    )
}

export default Ddoctor