import React from "react";
import ContactHero from "../Contact/ContactHero/ContactHero";
import Navbar from "./../Home/NavBar/Navbar";
import Footer from "./../Home/Footer/Footer";

const Contact: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Contenido principal */}
      <div className="flex-grow">
        <ContactHero />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Contact;