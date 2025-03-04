import React from "react";
import styles from "./sup.module.css" 
import { useNavigate } from "react-router-dom";
import HeroSupp_D from "./HeroSupp_D.tsx/HeroSupp_D";

const Support_D: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col min-h-screen">
      <nav className={styles.navbar}>
                <div className={styles.navbarleft}>
                    <ul>
                        <li className={styles.profile}>
                            <img  
                                src="public/user.png" 
                                alt="Foto de perfil" 
                                className={styles.img}
                            />
                            Nombre
                        </li>
                    </ul>
                </div>

                <div className={styles.navbarcenter}>
                    Aqui te ayudaremos con tus dudas
                </div>
                   
                <div className={styles.navbarright}>
                    
                    <button type='submit' className={styles.salir} onClick={() => navigate("/list_patients")}> Regresar </button>
                </div>
            </nav>
      {/* Contenido principal */}
      <div className="flex-grow">
        <HeroSupp_D />
      </div>

      
    </div>
  );
};

export default Support_D;