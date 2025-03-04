import React from 'react'
import styles from "./dashboard-doctor.module.css" // Importar estilos de Login modules
import { useNavigate } from "react-router-dom";

const Ddoctor: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div className={styles.DashDoctor}>
            <nav className={styles.navbar}>
                <div className={styles.navbarleft}>
                    <ul>
                        <li className={styles.profile}>
                            <img  
                                src="public/user.png" 
                                alt="Foto de perfil" 
                                className={styles.img}
                            />
                            Perfil
                        </li>
                    </ul>
                </div>

                <div className={styles.navbarcenter}>
                    ¡Bienvenido!
                </div>
                   
                <div className={styles.navbarright}>
                    <ul>
                        <li>Configuraciones</li>
                    </ul>
                    <button type='submit' className={styles.salir} onClick={() => navigate("/")}> Cerrar Sesión </button>
                </div>
            </nav>

            <h1 className={styles.title}> Aca podras ver todo lo que necesitas </h1>
            
            <div className={styles.container}>
                    <div className={styles.important}>
                        <h1 className={styles.subtitle}> Novedades Importantes </h1>
                    </div>
                
                    <div className={styles.sidebar}>
                        <button type='submit' className={styles.button} onClick={() => navigate("/list_patients")}> Pacientes </button>
                        <button type='submit' className={styles.button} onClick={() => navigate("/")}> Notificaciones </button>
                    </div>
            </div>
        </div>
    )
}

export default Ddoctor