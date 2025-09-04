import React, { useState } from "react";
import styles from "./agendar_citas_Doc.module.css";
import { useNavigate } from "react-router-dom";
import Navbar_G from "../../../../components/NavBars/Navbar_Globla";

const agendarcita_doc: React.FC = () => {
  const navigate = useNavigate();
  const [cedulaPaciente, setCedulaPaciente] = useState("");
//  const [fecha, setFecha] = useState("");
//  const [hora, setHora] = useState("");
//  const [motivo, setMotivo] = useState("");
//  const [tipo, setTipo] = useState<"Presencial" | "Virtual">("Presencial");

  return (
    <div className={styles.agendar_citas_Doc}>
      <Navbar_G
        profileText="Regresar"
        profilePath="/dashboard_doctor"
        profileImg="public/user.png"
        centerText="Nombre, Aca podras gestionar las citas de tus pacientes"
        menuItems={[]}
        onLogout={() => navigate("/Support_D")}
        logoutText="Soporte"
      />

      {/* Imagen medicos */}
      <img
        src="../../../../public/logo_medicos2.png"
        alt="Logo medicos"
        className={styles.logo}
      />

      <div className={styles.container}>
        {/* FORMULARIO PARA AGENDAR CITA */}
        <section className={styles.form}>
          <h2>Agendar Nueva Cita</h2>
          <div className={styles.group}>
            <label htmlFor="">Cedula del Paciente</label>
            <input
              type="text"
              value={cedulaPaciente}
              onChange={(e) => setCedulaPaciente(e.target.value)}
              placeholder="Buscar por Cédula"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default agendarcita_doc;
