import React from 'react';
import styles from './Navbar_Global.module.css'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

interface MenuItem {
    label: string
    path: string
}

interface NavbarProps {
    profileText: string | React.ReactNode
    profilePath?: string
    profileImg?: string
    centerText: string
    menuItems: MenuItem[]
    onLogout?: () => void | Promise<void>
    logoutText?: string
    logoutPath?: string
}

const Navbar_G: React.FC<NavbarProps> = ({
    profileText,
    profilePath,
    profileImg = "public/user.img",
    centerText,
    menuItems = [],
    onLogout,
    logoutText = "Cerrar Sesión",
    logoutPath = "/login"
}) => {
    const navigate = useNavigate()

    //Funcion para manejar redirigimiento

    const handleLogout = () => {
        if (onLogout) {
            onLogout() //Permite la redirección de la vista 
        } else {
            navigate(logoutPath) //Si no hay nada por defecto a login
        }
    }

    return (
        <nav className={styles.navbar}>
            {/* Lado Izquierdo */}
            <div className={styles.navbarleft}>
                 <ul>
                     <li className={styles.profile}>
                         <img 
                             src={profileImg}
                             alt="Foto perfil"
                             className={styles.img}
                        />
                        {profilePath ? (<Link to={profilePath}>{profileText}</Link>) : ( profileText)}
                     </li>
                 </ul>
            </div>

            {/* Centro */}
            <div className={styles.navbarcenter}>
                {centerText}
            </div>

            {/* Lado Derecho */}
            <div className={styles.navbarright}>
                <ul>
                    {menuItems.map(( item, index ) => (
                        <li key={index}>
                            <Link to={item.path}>{item.label}</Link>
                        </li>
                    ))}
                </ul>
                {onLogout && (

                    <button
                        type='button'
                        className={styles.salir}
                        onClick={handleLogout} //Ejecutar función de redirección
                    >
                        {logoutText}
                    </button>
                )}
                
            </div>
        </nav>
    )
}

export default Navbar_G