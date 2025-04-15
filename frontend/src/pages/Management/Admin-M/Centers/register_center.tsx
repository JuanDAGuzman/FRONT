import React from "react";
import styles from "./register_center.module.css";
import { useNavigate } from "react-router-dom";
import Navbar_G from "../../../../components/NavBars/Navbar_Globla";

const Register_HealthCenter: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.Register_HealthCenter}>
      <Navbar_G
        profileText="Regresar"
        profilePath="/dashboard_admin"
        profileImg="public/user.png"
        centerText="Registro de Centro de Salud"
        menuItems={[{ label: "Configuraciones", path: "/" }]}
        onLogout={() => navigate("/login")}
      />

      <div className={styles.container}>
        <div className={styles.Content}>
          <h2 className={styles.title}>Registrar Centro de Salud</h2>

          <form className={styles.formContainer}>
            <div className={styles.column}>
              <label>Nombre del centro</label>
              <input
                type="text"
                placeholder="Ej: Clínica Santa María"
                className={styles.info}
              />

              <label>Tipo de institución</label>
              <select className={styles.info}>
                <option value="">Seleccione tipo</option>
                <option value="clinica">Clínica</option>
                <option value="hospital">Hospital</option>
                <option value="ips">IPS</option>
                <option value="centro_salud">Centro de salud</option>
              </select>

              <label>Dirección</label>
              <input
                type="text"
                placeholder="Ej: Calle 123 #45-67"
                className={styles.info}
              />

              <label>Ciudad</label>
              <select className={styles.info}>
                <option value="bogota">Bogotá</option>
                <option value="medellin">Medellín</option>
                <option value="cali">Cali</option>
                <option value="barranquilla">Barranquilla</option>
                <option value="otro">Otra</option>
              </select>

              <label>Teléfono</label>
              <input
                type="tel"
                placeholder="Ej: +57 320 123 4567"
                className={styles.info}
              />

              <label>Correo electrónico</label>
              <input
                type="email"
                placeholder="Ej: contacto@clinicacentral.com"
                className={styles.info}
              />

              <label>Departamento</label>
              <input
                type="text"
                placeholder="Ej: Cundinamarca"
                className={styles.info}
              />

              <label>Régimen</label>
              <select className={styles.info}>
                <option value="">Seleccione régimen</option>
                <option value="contributivo">Contributivo</option>
                <option value="subsidiado">Subsidiado</option>
                <option value="mixto">Mixto</option>
              </select>
            </div>
          </form>

          <div className={styles.buttons}>
            <button className={styles.cancelButton}>Cancelar</button>
            <button
              className={styles.registerButton}
              onClick={() => navigate("/dashboard_admin")}
            >
              Registrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register_HealthCenter;
