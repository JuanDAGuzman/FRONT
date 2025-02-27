import React from 'react'
import './login.css' //se importan estilos de login

const Login: React.FC = () => {
    return (
        <div className='fondo'>

            <div className='title'>
                <h1>Sistema Web de gestión de pacientes</h1>
            </div>

            <div className='container'>
            <div className='right'>
                <h2>Iniciar Sesión</h2>
                <form>
                    <div className='input-box'>
                        <input type="email" placeholder='Email Andress' required/>
                    </div>
                    <div className='input-box'>
                        <input type="password" placeholder='Password' required/>
                    </div>
                    <button type='submit' className='btn'>Sign In</button>
                </form>
            </div>

            <div className='logo'>
                <img src="/umb-logo.png" alt="UMB logo" />
            </div>
            </div>

        </div>
    )
}

export default Login