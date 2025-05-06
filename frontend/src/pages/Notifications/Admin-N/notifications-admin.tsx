import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar_G from "../../../components/NavBars/Navbar_Globla";
import styles from "./notifications-admin.module.css";
import { FaSearch } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai"; // Importamos un icono de eliminar

interface Notification {
  id: number;
  title: string;
  message: string;
  type: "info" | "success" | "warning";
  read: boolean;
  urgent: boolean;
  link: string;
  date: string;
}

const Notifications_Admin: React.FC = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Nuevo paciente registrado",
      message: "Se ha agregado un nuevo paciente con historial completo. Detalles adicionales sobre el paciente y su registro están disponibles aquí.",
      type: "info",
      read: false,
      urgent: true,
      link: "/pacientes",
      date: "2025-04-25",
    },
    {
      id: 1,
      title: "Nuevo paciente registrado",
      message: "Se ha agregado un nuevo paciente con historial completo. Detalles adicionales sobre el paciente y su registro están disponibles aquí.",
      type: "info",
      read: false,
      urgent: true,
      link: "/pacientes",
      date: "2025-04-25",
    },
    {
      id: 1,
      title: "Nuevo paciente registrado",
      message: "Se ha agregado un nuevo paciente con historial completo. Detalles adicionales sobre el paciente y su registro están disponibles aquí.",
      type: "info",
      read: false,
      urgent: true,
      link: "/pacientes",
      date: "2025-04-25",
    },
    {
      id: 2,
      title: "Cambio de rol",
      message: "Un usuario ha sido promovido a Administrador del sistema. Se le han otorgado permisos adicionales. Detalles sobre los cambios de permisos se pueden ver aquí.",
      type: "success",
      read: true,
      urgent: false,
      link: "/usuarios",
      date: "2025-04-20",
    },
    {
      id: 3,
      title: "Alerta de inactividad",
      message: "Se ha detectado un periodo prolongado sin actividad en el sistema. Por favor, revise los registros para asegurar la continuidad. Más información sobre los periodos de inactividad detectados.",
      type: "warning",
      read: false, 
      urgent: true,
      link: "/alertas",
      date: "2025-04-28",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  const handleDeleteNotification = (id: number) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
    setSelectedNotification(null);
  };

  const handleViewDetails = (notification: Notification) => {
    setSelectedNotification(notification);
  };

  const filteredNotifications = notifications
    .filter(
      (notif) =>
        notif.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        notif.date.includes(searchDate)
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className={styles.NotificationsAdmin}>
      <Navbar_G
        profileText="Regresar"
        profilePath="/dashboard_admin"
        profileImg="public/user.png"
        centerText="Notificaciones"
        menuItems={[{ label: "Configuraciones", path: "/" }]}
        onLogout={() => navigate("/")}
      />

      <div className={styles.notificationsContainer}>
        <div className={styles.title}>Notificaciones</div>

        {/* Barra de búsqueda y filtros */}
        <div className={styles.searchWrapper}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Buscar por título..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input
            type="date"
            className={styles.dateInput}
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
          <button className={styles.searchButton}>
            <FaSearch className={styles.searchIcon} />
          </button>
        </div>

        {/* Lista de notificaciones */}
        <div className={styles.notificationsList}>
          {filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              className={`${styles.card} ${styles[notif.type]} ${notif.read ? "read" : "unread"}`}
            >
              <div className={styles.cardHeader}>
                <h3>{notif.title}</h3>
                <span className={styles.date}>{notif.date}</span>
              </div>
              <div className={styles.preview}>
                {notif.message.length > 60
                  ? `${notif.message.substring(0, 60)}...`
                  : notif.message}
              </div>
              <div className={styles.cardActions}>
                <button
                  className={styles.toggleButton}
                  onClick={() => handleViewDetails(notif)}
                >
                  Ver detalles
                </button>
                <div
                  className={styles.deleteIcon}
                  onClick={() => handleDeleteNotification(notif.id)}
                >
                  <AiOutlineDelete /> {/* Usamos el icono de eliminar */}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Área para mostrar los detalles de la notificación */}
        <div className={styles.notificationDetails}>
          {selectedNotification ? (
            <>
              <h4>{selectedNotification.title}</h4>
              <p>{selectedNotification.message}</p>
              {/* Puedes mostrar más detalles aquí si es necesario */}
            </>
          ) : (
            <p>Selecciona una notificación para ver los detalles.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications_Admin;