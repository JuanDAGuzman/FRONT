import React from 'react'
import './login.css' //se importan estilos de login

const Login: React.FC = () => {
    return (
        <div className='fondo'>

            <div className='container'>
                <div className='sub-title'>
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
                    <img src="src/assets/umb-logo.png" alt="UMB logo" />
                </div>
            </div>

        </div>
    )
}

export default Login