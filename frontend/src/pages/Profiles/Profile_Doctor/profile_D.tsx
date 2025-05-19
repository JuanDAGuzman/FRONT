import React, {useState, useRef} from "react";
import styles from "./profile_D.module.css"
import { useNavigate } from "react-router-dom";
import Navbar_G from '../../../components/NavBars/Navbar_Globla';
// import { } from "react-icons/fa";

const ProfileD: React.FC = () => {
    const navigate = useNavigate()
    const [profileImg, setProfileImg] = useState<string>("")
    const inputFileRef = useRef<HTMLInputElement | null>(null)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setProfileImg(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const triggerFileInput = () => {
        inputFileRef.current?.click()
    }

    return(
        <div className={styles.profileDoct}>
             <Navbar_G 
                profileText='Regresar'
                profilePath='/dashboard_doctor'
                profileImg={profileImg || "/user.png"}
                centerText='Este es tu Perfil'
                menuItems={[{label: "Configuraciones", path: "/"}]}
                onLogout={()  => navigate('/login')}
            />

            <div className={styles.container}>
                <div className={styles.content}>
                    <h1 className={styles.title}>Edición de Perfil</h1>
                    <form className={styles.formContainer}>
                        <div className={styles.imageContainer}>
                            <img 
                            src={profileImg || "/user.png"} 
                            alt="Doctor Profile"
                            className={styles.profileImage} 
                            />
                            <div className={styles.editOverlay} onClick={triggerFileInput}>
                                <i className="fas fa-pencil-alt"></i>
                            </div>
                            <input 
                            ref={inputFileRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            hidden
                            />
                        </div>
                        <div className={styles.inputsContainer}>
                            <div className={styles.column}>
                                <label>Nombre Completo</label>
                                <input 
                                type="text" 
                                placeholder="Camilo Gomez"
                                className={styles.info}
                                />
                                <label>Correo Electronico</label>
                                <input 
                                type="text" 
                                placeholder="doctor@correo.com"
                                className={styles.info}
                                />
                                <label>Telefono</label>
                                <input 
                                type="text" 
                                placeholder="300 123 4567"
                                className={styles.info}
                                />
                                <label>Documento de Identidad</label>
                                <div className={styles.docRow}>
                                    <select  
                                    id="TipoDocumento"
                                    className={styles.Select}
                                    aria-label="Tipo de Documento"
                                    defaultValue=""
                                    >
                                        <option value="" disabled hidden>
                                            TIPO
                                        </option>
                                        <option value="CC">CC</option>
                                        <option value="TI">TI</option>
                                        <option value="CE">CE</option>
                                        <option value="RC">RC</option>
                                    </select>
                                    <input
                                        type="text"
                                        id="Documento"
                                        placeholder="Número de Documento"
                                        className={styles.info}
                                    />
                                </div>
                                <label>Fecha de nacimiento</label>
                                <input 
                                type="date" 
                                id="FechaNacimiento"
                                placeholder="Número de Documento"
                                className={styles.info} />
                            </div>
                            <div className={styles.column}>
                                <label>Especialidad</label>
                                <input
                                type="text"
                                placeholder="Ej: Pie diabético"
                                className={styles.info}
                                />
                                <label>Tarjeta profesional</label>
                                <input
                                type="text"
                                placeholder="Ej: 1234567890"
                                className={styles.info}
                                />
                                <label>Centro de salud</label>
                                <select  
                                    id="Clinica"
                                    className={styles.Select}
                                    aria-label="Centro de Salud"
                                    defaultValue=""
                                    >
                                    <option value="clinica1">Clínica Central</option>
                                    <option value="clinica2">Clínica del Valle</option>
                                    <option value="clinica3">Clínica del Norte</option>
                                </select>
                                <label>Ciudad</label>
                                <select  
                                    id="Ciudad"
                                    className={styles.Select}
                                    aria-label="Ciudad"
                                    defaultValue=""
                                    >
                                    <option value="bogota">Bogotá</option>
                                    <option value="medellin">Medellín</option>
                                    <option value="california">California</option>
                                </select>
                            </div>
                        </div>
                    </form>
                    <div className={styles.buttons}>
                        <button className={styles.cancelButton}>Cancelar</button>
                        <button
                        className={styles.saveButton}
                        onClick={() => navigate("/profile")}
                        >
                            Guradar Cambios
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileD