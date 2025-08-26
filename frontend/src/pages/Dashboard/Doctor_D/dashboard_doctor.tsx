import React from "react";
import DoctorNavbar from "../../../components/NavBar/DoctorNavbar";
import Footer from "../../../components/Footer/Footer";
import TodayAppointments from "./TodayAppointments";
import AppointmentRequestsPanel from "./AppointmentRequestsPanel";

const DoctorDashboard: React.FC = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (!user?.id) {
    window.location.href = "/login";
    return null;
  }


  const doctorId = user.doctorId || user.id;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <DoctorNavbar user={user} />
      <main className="container mx-auto px-4 py-8 flex-1 pt-24">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          ¡Bienvenido Dr(a). {user.name || "Doctor"}!
        </h1>
        <p className="text-gray-600 mb-8">
          Gestiona tus pacientes, revisa citas del día y solicitudes entrantes.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TodayAppointments doctorId={doctorId} />
          </div>
          <div className="lg:col-span-1">
            <AppointmentRequestsPanel />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DoctorDashboard;
