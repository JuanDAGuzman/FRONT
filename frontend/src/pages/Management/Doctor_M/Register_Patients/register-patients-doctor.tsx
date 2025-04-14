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
                <h1 className={styles.title}>Registro de pacientes</h1>

                {/* CONTENDOR REGISTRO */}
                <div className={styles.Content}>
                    <div className={styles.formContainer}>
                        <div className={styles.column}>

                            <label htmlFor="nombre">Nombre</label>
                            <input type="text" id="nombre" placeholder="Escribe el o los nombres" className={styles.info}/>

                            
                            <label htmlFor="Documento">Documento de Identidad</label>
                            <div className={styles.docRow}>
                                <select id="Documento" className={styles.Select} aria-label="Tipo de Documento" defaultValue="" >
                                    <option value="" disabled hidden>TIPO</option>
                                    <option value="CC">CC</option>
                                    <option value="TI">TI</option>
                                    <option value="CE">CE</option>
                                    <option value="RC">RC</option>
                                </select>
                                <input type="text" id="Documento" placeholder="Número de Documento" className={styles.info}/>
                            </div>
                            
                            <label htmlFor="sexo">Sexo</label>
                                <div className={styles.sexo}>
                                    <label><input type="radio" name="sexo" /> Masculino </label>
                                    <label><input type="radio" name="sexo" /> Femenino </label>
                                </div>

                            <label htmlFor="diagnostico">Diagnóstico</label>
                            <select id="diagnostico" className={styles.SelectLine} aria-label="Diagnostico Paciente" defaultValue="">
                                <option value="" disabled hidden> Elija el Diagnostico</option>
                                <option value="No complicado">Pie diabético no complicado</option>
                                <option value="Infección">Pie diabético con infección</option>
                                <option value="Isquemia">Pie diabético con isquemia</option>
                                <option value="Úlcera">Úlcera neuropática</option>
                                <option value="Osteoarticular">Infección osteoarticular</option>
                                <option value="Amputación">Amputación previa</option>
                            </select>

                            <label htmlFor="Acceso_vas">Acceso Vascular</label>
                            <select id="Acceso_vas" className={styles.SelectLine} aria-label="Acceso Vascular" defaultValue="" >
                                <option value="" disabled hidden> Elija el tipo de Acceso</option>
                                <option value="Catéter temporal">Catéter temporal</option>
                                <option value="Catéter tunelizado">Catéter tunelizado</option>
                                <option value="Fístula AV">Fístula arteriovenosa</option>
                                <option value="Injerto">Injerto protésico</option>
                                <option value="Ninguno">Ninguno</option>
                            </select>

                        </div>

                        <div className={styles.column}>

                            <label htmlFor="apellidos">Apellidos</label>
                            <input type="text" id="apellidos" placeholder="Escribe los Apellidos" className={styles.info}/>

                            <label htmlFor="fecha">Fecha de Nacimiento</label>
                            <input type="date" id="fecha" placeholder="" className={styles.info}/>

                            <label htmlFor="ciudad">Ciudad</label>
                            <select id="ciudad" className={styles.SelectLine} aria-label="Ciudad de Residencia" defaultValue="">
                                <option value="" disabled hidden>Elija la Ciudad</option>
                                <option value="">Bogotá</option>
                                <option value="">Medellin</option>
                                <option value="">Barranquilla</option>
                                <option value="">Cali</option>
                            </select>

                            <label htmlFor="centro_salud">Centro de Salud</label>
                            <select id="centro_salud" className={styles.SelectLine} aria-label="Centro de Salud" defaultValue="">
                                <option value="" disabled hidden>Elija el Centro de Salud</option>
                                <option value="Fundación Santa Fe de Bogotá">Fundación Santa Fe de Bogotá</option>
                                <option value="Hospital Pablo Tobón Uribe">Hospital Pablo Tobón Uribe</option>
                                <option value="Hospital General de Barranquilla">Hospital General de Barranquilla</option>
                                <option value="Fundación Valle del Lili">Fundación Valle del Lili</option>
                            </select>
                            
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