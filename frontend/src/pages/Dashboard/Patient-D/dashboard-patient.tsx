import React, { useEffect, useState } from "react";
import PatientNavbar from "../../../components/NavBar/PatientNavbar.tsx";
import WelcomeSection from "../../../components/DashboardPatient/WelcomeSection";
import PatientHero from "../../../components/DashboardPatient/PatientHero";
import EventsCalendar from "../../../components/DashboardPatient/EventsCalendar";
import Footer from "../../../components/Footer/Footer";
import AutocareSection from "../../../components/DashboardPatient/AutocareSection";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}
interface Patient {
  id: number;
  userId: number;
  contactInfo: string;
  clinicalInfo: string;
  User: User;
}

const Patient_D: React.FC = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const token = localStorage.getItem("token");
    if (!user?.id || !token) {
      window.location.href = "/login";
      return;
    }

    fetch(`http://localhost:4000/api/patients/user/${user.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.User && data.User.name && data.User.role) {
          setPatient(data);
        } else {
          setPatient(null);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (!patient || !patient.User) return <div>No se encontró el paciente.</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <PatientNavbar user={patient.User} />
      <div className="pt-24">
        <main className="container mx-auto px-4 py-8">
          <WelcomeSection userName={patient.User.name} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <PatientHero patientId={patient.id} />
              <AutocareSection />
            </div>
            <div className="lg:col-span-1">
              <EventsCalendar patientId={patient.id} />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Patient_D;
