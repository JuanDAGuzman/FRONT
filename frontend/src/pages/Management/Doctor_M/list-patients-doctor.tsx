import React from 'react'
import styles from "./list-patients-doctor.module.css" 
import { useNavigate } from "react-router-dom";

const List_Patients: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div>
            <button type='submit' className={styles.btn} onClick={() => navigate("/")}> Cerrar Sesión </button>
        </div>
    )
}

export default List_Patients