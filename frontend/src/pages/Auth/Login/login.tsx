import React from 'react';
import styles from './login.module.css'; // Importar estilos de Login modules
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.login}>
      <div className={styles.fondo}>
        <div className={styles.container}>
          <div className={styles.form}>
            <h2 className={styles.title}>Iniciar Sesión</h2>
            <form>
              <div className={styles.input_box}>
                <input type="email" placeholder="Correo Electronico" required />
              </div>
              <div className={styles.input_box}>
                <input type="password" placeholder="Contraseña" required />
              </div>
              <button
                type="submit"
                className={styles.btn}
                onClick={() => navigate('/twoFactor')}
              >
                Sign In
              </button>
            </form>
          </div>

          <div className={styles.logo_UMB}>
            <img src="public/umb-logo.png" alt="UMB logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
