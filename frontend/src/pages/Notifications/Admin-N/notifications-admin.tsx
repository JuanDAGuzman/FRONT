import React from "react";
import styles from "./notifications-admin.modules.css";
import { useNavigate } from "react-router-dom";
import Navbar_G from '../../../components/NavBars/Navbar_Globla';



const Notifications_Admin: React.FC = ()=>{
    const navigate = useNavigate();

    return(
        <div>
            <h1>Alertas y notificaciones </h1>
        </div>
    )

};

export default Notifications_Admin