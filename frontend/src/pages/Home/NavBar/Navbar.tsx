import React, { useState } from "react";
import Logo from "../../../assets/logo.png";

const navbarlinks = [
  {
    id: 1,
    tittle: "Inicio",
    link: "/",
  },
  {
    id: 2,
    tittle: "Nosotros",
    link: "#",
  },
  {
    id: 3,
    tittle: "Contacto",
    link: "/",
  },
  {
    id: 4,
    tittle: "Soporte",
    link: "#",
  },
];

const navbarRedes = [
  {
    id: 1,
    tittle: "DevJuan",
    link: "https://github.com/JuanDAGuzman",
    icon: "bi bi-github",
  },
  {
    id: 2,
    tittle: "DevCamilo",
    link: "https://github.com/CamAGomezB27",
    icon: "bi bi-github",
  },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-red-400/40">
      <div className="flex justify-between items-center sm:px-12 sm:py-6 px-4 py-3">
        <div>
          <img className="w-[50px]" src={Logo} alt="logo del sitio" />
        </div>

        {/* BTN HAMBURGUESA */}
        <button onClick={toggleMenu} className="md:hidden text-white">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L16 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
        {/* MENU DESKTOP */}

        <div className="hidden md:block">
          <ul className="flex sm:space-x-8 space-x-4">
            {navbarlinks.map((link) => (
              <li key={link.id}>
                <a
                  className="text-white text-sm sm:text-lg hover:text-red-700 transition-transform hover:scale-110 transform inline-block duration-300"
                  href={link.link}
                >
                  {link.tittle}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden md:block">
          <ul className="flex space-x-4">
            {navbarRedes.map((link) => (
              <li key={link.id}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block transition-transform duration:300 transform hover:scale-125"
                  href={link.link}
                >
                  <i
                    className={`${link.icon} sm:text-2xl text-lg text-white hover:text-red-700 transition-all duration-300`}
                  ></i>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* MENU MOBILE */}

      <div
        className={`md:hidden absolute w-full bg-red-900 transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <ul className="flex flex-col px-4 py-2">
          {navbarlinks.map((link) => (
            <li key={link.id} className="py-2 text-center">
              <a
                className="text-white hover:text-red-700 "
                href={link.link}
                onClick={() => setIsOpen(false)}
              >
                {link.tittle}
              </a>
            </li>
          ))}
        </ul>
        <ul className="flex space-x-4 px-4 py-2 border-t border-white justify-center">
          {navbarRedes.map((link) => (
            <li key={link.id}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
                href={link.link}
              >
                <i
                  className={`${link.icon} text-lg text-white hover:text-red-600 `}
                ></i>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
