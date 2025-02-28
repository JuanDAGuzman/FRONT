import React from 'react'
import './home.css' //Se importan estilos del home
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div className='container'>
            <h1 className='title'>Sistema Web de gestión de pacientes</h1>
            <button type='submit' className='btn' onClick={() => navigate("/login")}>Ingresa</button>
        </div> 
    )
}

export default Home