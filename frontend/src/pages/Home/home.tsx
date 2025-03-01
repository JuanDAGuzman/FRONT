import React from 'react'
import styles from "./home.module.css" // Importar estilos de Home modules
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Sistema Web de gestión de pacientes</h1>
            <button type='submit' className={styles.btn} onClick={() => navigate("/login")}>Ingresa</button>

            <div className={styles.logo_UMB}>
                <img src="public/umb-logo.png" alt="UMB logo" />
            </div>
        </div> 
    )
}

export default Home