import React from "react";
import styles from "./register-patientes-doctor.module.css"
import { useNavigate } from "react-router-dom";
import Navbar_G from "../../../../components/NavBars/Navbar_Globla";

const Registro_Patient: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div className={styles.Registro_Patient}>

            <Navbar_G 
                profileText='Nombre'
                profilePath='/'
                profileImg='public/user.png'
                centerText='Registra tu Paciente'
                menuItems={[]}
                onLogout={() => navigate('/Support_D')}
                logoutText='Soporte'
            />
        
            {/* Imagen medicos */}
            <img src="../../../../public/logo_medicos2.png" alt="Logo medicos" className={styles.logo} />

            {/* CONTENDOR PAGINA */}
            <div className={styles.container}>
                <h1 className={styles.title}>Registor De Pacientes</h1>

                {/* CONTENDOR REGISTRO */}
                <div className={styles.Content}>
                    <div className={styles.formContainer}>
                        <div className={styles.column}>

                            <label htmlFor="nombre">Nombre</label>
                            <input type="text" id="nombre" placeholder="Escribe el o los nombres" className={styles.info}/>

                            <label htmlFor="Documento">Documento de Identidad</label>
                            <input type="text" id="Documento" placeholder="Escribe el número del documento " className={styles.info}/>

                            <label htmlFor="sexo">Sexo</label>
                                <div className={styles.sexo}>
                                    <label><input type="radio" name="sexo" /> Masculino </label>
                                    <label><input type="radio" name="sexo" /> Femenino </label>
                                </div>

                            <label htmlFor="diagnostico">Diagnostico</label>
                            <input type="text" id="Diagnostico" placeholder="Escribe el diagnostico del paciente " className={styles.info}/>

                            <label htmlFor="Acceso_vas">Acceso Vascular</label>
                            <input type="text" id="acceso" placeholder="Ej: Catéter, Fístula, etc." className={styles.info}/>
                        </div>

                        <div className={styles.column}>

                            <label htmlFor="apellidos">Apellidos</label>
                            <input type="text" id="apellidos" placeholder="Escribe los Apellidos" className={styles.info}/>

                            <label htmlFor="fecha">Fecha de Nacimiento</label>
                            <input type="date" id="fecha" placeholder="" className={styles.info}/>

                            <label htmlFor="ciudad">Ciudad</label>
                            <input type="text" id="ciudad" placeholder="Escribe la ciudad de residencia" className={styles.info}/>

                            <label htmlFor="centro_salud">Centro de Salud</label>
                            <input type="text" id="nombre" placeholder="Escribe el centro de salud" className={styles.info}/>
                        </div>     
                    </div>
                    <div className={styles.buttons}>
                        <button type="submit" className={styles.button}>Guardar</button>
                        <button type="button" onClick={() => navigate('/list_patients_doctor')} className={styles.button}>Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Registro_Patient