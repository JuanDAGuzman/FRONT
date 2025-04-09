import React from 'react'
import styles from "./list-patients-doctor.module.css" 
import { useNavigate } from "react-router-dom";
import Navbar_G from '../../../../components/NavBars/Navbar_Globla';

const List_Patients: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div className={styles.List_Patients_Doc}>

            <Navbar_G 
                profileText='Regresar'
                profilePath='/dashboard-doctor'
                profileImg='public/user.png'
                centerText='Nombre, Aca podras ver tus pacientes'
                menuItems={[]}
                onLogout={() => navigate('/Support_D')}
                logoutText='Soporte'
            />

            {/* Imagen medicos */}
            <img src="../../../../public/logo_medicos2.png" alt="Logo medicos" className={styles.logo} />

            {/* CONTENDOR */}
            <div className={styles.container}>
                <h1 className={styles.title}>Lista de Pacientes</h1>
                <div className={styles.btn}>
                    <button type='submit' className={styles.button} onClick={() => navigate("/register_patients_doctor")}> Registro de Pacientes </button>
                </div>

                {/* FILTROS */}
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
                        <label htmlFor="documento" className={styles.label}>Ciudad</label>
                        <input type="text" placeholder='Ciudad' className={styles.buscar}/>
                    </div>
                    <div className={styles.group}>
                        <label htmlFor="documento" className={styles.label}>Centro de salud</label>
                        <input type="text" placeholder='Centro de Salud' className={styles.buscar}/>
                    </div>
                </section>

                {/* INFORMACIÓN */}
                <div className={styles.gridinfo}>
                    <span>Cédula</span>
                    <span>Nombre</span>
                    <span>Ciudad</span>
                    <span>Centro de Salud</span>
                    <span>Diagnostico</span>
                    <span className={styles.acciones}>ACCIONES</span>
                </div>
            </div>

        </div>
    )
}

export default List_Patients