import React from 'react'
import styles from "./list-patients-doctor.module.css" 
import { useNavigate } from "react-router-dom";
import Navbar_G from '../../../components/NavBars/Navbar_Globla';

const List_Patients: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div className={styles.List_Patients_Doc}>

            <Navbar_G 
                profileText='Regresar'
                profilePath='/dashboard-doctor'
                profileImg='public/user.png'
                centerText='Nombre, Aca podemos organizar los pacientes'
                menuItems={[]}
                onLogout={() => navigate('/Support_D')}
                logoutText='Soporte'
            />
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