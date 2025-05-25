import React, { useState, useRef } from "react";
import styles from "./register-doctor.module.css";
import { useNavigate } from "react-router-dom";
import Navbar_G from "../../../../components/NavBars/Navbar_Globla";

const Register_Doctor: React.FC = () => {
  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState<string>("");
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImg(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    inputFileRef.current?.click();
  };

  return (
    <div className={styles.Register_Doctor}>
      <Navbar_G
        profileText="Regresar"
        profilePath="/dashboard_admin" // Asegúrate de que esta ruta sea correcta para tu dashboard de administrador
        profileImg="public/user.png"
        centerText="¡Bienvenido, Nombre!"
        menuItems={[{ label: "Configuraciones", path: "/" }]}
        onLogout={() => navigate("/login")}
      />

      <div className={styles.mainContentArea}>
        <h2 className={styles.title}>Registrar Usuario</h2>

        <form className={styles.formContainer}>
          <div className={styles.imageAndInputsWrapper}>
            <div className={styles.imageContainer}>
              <img
                src={profileImg || "/user.png"}
                alt="Doctor Profile"
                className={styles.profileImage}
              />
              <div className={styles.editOverlay} onClick={triggerFileInput}>
                {/* Asegúrate de tener Font Awesome o un ícono similar importado globalmente para 'fas fa-pencil-alt' */}
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

            <div className={styles.inputsGrid}>
              {/* Columna 1 */}
              <div className={styles.column}>
                <label>Nombre completo</label>
                <input
                  type="text"
                  placeholder="Ej: Dr. Juan Pérez"
                  className={styles.info}
                  required
                />

                <label>Correo electrónico</label>
                <input
                  type="email"
                  placeholder="Ej: doctor@correo.com"
                  className={styles.info}
                  required
                />

                <label>Teléfono</label>
                <input
                  type="tel"
                  placeholder="Ej: +57 300 123 4567"
                  className={styles.info}
                />

                <label>Documento de Identificación</label>
                <div className={styles.docRow}>
                  <select
                    id="TipoDocumento"
                    className={styles.Select}
                    aria-label="Tipo de Documento"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled hidden>TIPO</option>
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
                    required
                  />
                </div>

                <label>Sexo</label>
                <div className={styles.genderContainer}>
                  <label><input type="radio" name="gender" value="male" /> Masculino</label>
                  <label><input type="radio" name="gender" value="female" /> Femenino</label>
                </div>
              </div>

              {/* Columna 2 */}
              <div className={styles.column}>
                {/* Campo Fecha de nacimiento (reubicado para equilibrar las columnas) */}
                <label>Fecha de nacimiento</label>
                <input type="date" className={styles.info} required />

                {/* Campo Tipo de Usuario con opción predeterminada "Selecciona una opción" */}
                <label>Tipo de Usuario</label>
                <select className={styles.info} required defaultValue="">
                  <option value="" disabled hidden>Selecciona una opción</option>
                  <option value="doctor">Doctor</option>
                  <option value="admin">Administrador</option>
                </select>

                <label>Especialidad</label>
                <input
                  type="text"
                  placeholder="Ej: Cardiología"
                  className={styles.info}
                />

                <label>Matrícula profesional</label>
                <input
                  type="text"
                  placeholder="Ej: 1234567890"
                  className={styles.info}
                />

                <label>Centro de salud</label>
                <select className={styles.info} defaultValue="">
                  <option value="" disabled hidden>Selecciona un centro</option>
                  <option value="clinica1">Clínica Central</option>
                  <option value="clinica2">Clínica del Valle</option>
                  <option value="clinica3">Clínica del Norte</option>
                </select>

                <label>Ciudad</label>
                <select className={styles.info} defaultValue="">
                  <option value="" disabled hidden>Selecciona una ciudad</option>
                  <option value="bogota">Bogotá</option>
                  <option value="medellin">Medellín</option>
                  <option value="california">California</option>
                </select>
              </div>
            </div>
          </div> {/* Fin de imageAndInputsWrapper */}

          <div className={styles.buttons}>
            <button type="button" className={styles.cancelButton} onClick={() => navigate('/dashboard_admin')}>Cancelar</button>
            <button
              type="submit" // Usar type="submit" si vas a manejar el envío del formulario
              className={styles.registerButton}
              onClick={() => console.log("Formulario enviado")} // Aquí deberías manejar el envío del formulario
            >
              Registrar
            </button>
          </div>
        </form>
      </div> {/* Fin de mainContentArea */}
    </div>
  );
};

export default Register_Doctor;