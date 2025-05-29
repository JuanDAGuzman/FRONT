import React from "react";
import PatientNavbar from "../../../components/NavBar/PatientNavbar.tsx";
import WelcomeSection from "../../../components/DashboardPatient/WelcomeSection";
import PatientHero from "../../../components/DashboardPatient/PatientHero";
import AutocareSection from "../../../components/DashboardPatient/AutocareSection";
import EventsCalendar from "../../../components/DashboardPatient/EventsCalendar";
import Footer from "../../../components/Footer/Footer";

const Patient_D: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <PatientNavbar />

      <div className="pt-24">
        <main className="container mx-auto px-4 py-8">
          <WelcomeSection userName="Nombre" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <PatientHero />
              <AutocareSection />
            </div>

            <div className="lg:col-span-1">
              <EventsCalendar />
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Patient_D;
