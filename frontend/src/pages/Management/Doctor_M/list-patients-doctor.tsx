import React from 'react'
import styles from "./list-patients-doctor.module.css" 
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const List_Patients: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div className={styles.List_Patients_Doc}>
            <nav className={styles.navbar}>
                <div className={styles.navbarleft}>
                    <ul>
                        <li className={styles.profile}>
                            <img  
                                src="public/user.png" 
                                alt="Foto de perfil" 
                                className={styles.img}
                            />
                            
                            <Link to="/dashboard-doctor">Regresar</Link>
                        </li>
                    </ul>
                </div>

                <div className={styles.navbarcenter}>
                    Nombre, Aca podemos organizar los Pacientes
                </div>
                   
                <div className={styles.navbarright}>
                    
                    <button type='submit' className={styles.salir} onClick={() => navigate("/support_D")}> Soporte </button>
                </div>
            </nav>

            <div className={styles.container}>
                <h1 className={styles.title}>Lista de Pacientes</h1>
                <div className={styles.btn}>
                    <button type='submit' className={styles.button} onClick={() => navigate("/")}> Registro de Pacientes </button>
                </div>
                <section className={styles.sectBuscar}>
                    <div className={styles.group}>
                        <label htmlFor="documento" className={styles.label}>Documento de Identidad</label>
                        <input type="text" placeholder='Ingrese el documento' className={styles.buscar}/>
                    </div>
                    <div className={styles.group}>
                        <label htmlFor="documento" className={styles.label}>Nombre Paciente</label>
                        <input type="text" placeholder='Ingrese Nombre' className={styles.buscar}/>
                    </div>
                    <div className={styles.group}>
                        <label htmlFor="documento" className={styles.label}>Centro de salud</label>
                        <input type="text" placeholder='Centro de Salud' className={styles.buscar}/>
                    </div>
                    <div className={styles.group}>
                        <label htmlFor="documento" className={styles.label}>Departamento</label>
                        <input type="text" placeholder='Departamento' className={styles.buscar}/>
                    </div>
                </section>
            </div>

        </div>
    )
}

export default List_Patients