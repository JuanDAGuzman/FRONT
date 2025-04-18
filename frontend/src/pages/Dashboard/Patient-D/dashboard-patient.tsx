import React from "react";
import styles from "./dashboard-patient.module.css";
import { useNavigate } from "react-router-dom";
import Navbar_G from "../../../components/NavBars/Navbar_Globla";
import { FaVideo, FaCalendarAlt, FaUpload, FaBell } from "react-icons/fa";
import ActionCard from "../../../components/Cards/action_cards";
import Calendarcomponent from '../../../components/Calendar/Calendar';


const Dpatient: React.FC = () => {
    const navigate = useNavigate()
    
    return (
        <div className={styles.DashPatient}>
            <Navbar_G 
                profileText='Perfil'
                profileImg='/user.png'
                centerText='¡Bienvenido, Nombre!'
                menuItems={[{label: "Configuraciones", path: "/"}]}
                onLogout={()  => navigate('/login')}
            />

            <h1 className={styles.title}> Esta es tu sección personal </h1>

            <div className={styles.container}>
                <div className={styles.cardsContainer}>
                    <ActionCard 
                    icon={<FaUpload />}
                    title="Subir Resultados"
                    onClick={() => navigate('/login')}
                    />
                    <ActionCard 
                    icon={<FaCalendarAlt />}
                    title="Solicitar Cita"
                    onClick={() => navigate('/login')}
                    />
                    <ActionCard 
                    icon={<FaVideo />}
                    title="VideoConsulta"
                    onClick={() => navigate('/login')}
                    />
                    <ActionCard 
                    icon={<FaBell />}
                    title="Notificaciones"
                    onClick={() => navigate('/login')}
                    />
                </div>

                <div className={styles.Section}>
                    <h1 className={styles.Sectiontitle}>🧠 Autocuidado y prevención</h1>
                    <p className={styles.SectionText}>Consejos e información importante para cuidar de tu salud.</p>

                    <div>
                        <img src="" alt="Infografía Pie Diabético" />
                        <p>Señales de alerta en el pie diabético</p>
                    </div>

                    <div>
                        <iframe 
                        src="https://www.youtube.com/embed/Q5oM5B3G8MI"
                        title="Video Autocuidado"
                        allowFullScreen
                        />
                        <p>Video: Cómo identificar síntomas tempranos</p>
                    </div>
                </div>

                <div className={styles.calendar}>
                    {/* CALENDAR */}
                    <h1 className={styles.calendarTitle}> Proximos Eventos </h1>
                    <Calendarcomponent />
                </div>
            </div>
        </div>
    )
}

export default Dpatient