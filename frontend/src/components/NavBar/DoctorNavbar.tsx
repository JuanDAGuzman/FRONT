import React, { useState } from "react";
import { User, Settings, LogOut } from "lucide-react";

interface DoctorNavbarProps {
  user: {
    name: string;
    role: string;
    [key: string]: any;
  };
}

const navbarlinks = [
  { id: 1, tittle: "Dashboard", link: "/dashboard_doctor" },
  { id: 2, tittle: "Mis Pacientes", link: "/doctor_patients" },
  { id: 3, tittle: "Citas Médicas", link: "/doctor_appointments" },
  { id: 4, tittle: "Soporte", link: "/support" },
];

const DoctorNavbar: React.FC<DoctorNavbarProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleProfile = () => setIsProfileOpen((prev) => !prev);

  const initial = user?.name ? user.name[0].toUpperCase() : "D";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-[#B71C1C] shadow-lg transition-all duration-300">
      <div className="flex justify-between items-center sm:px-12 sm:py-4 px-4 py-2">
        <h1 className="text-white font-bold text-2xl">UMB</h1>

        <div className="hidden md:flex justify-center items-center">
          <ul className="flex sm:space-x-8 space-x-4">
            {navbarlinks.map((link) => (
              <li key={link.id}>
                <a
                  className="text-white text-sm sm:text-lg hover:text-sky-300 transition-transform hover:scale-110 transform inline-block duration-300"
                  href={link.link}
                >
                  {link.tittle}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden md:flex items-center space-x-2">
          <div className="relative">
            <button
              onClick={toggleProfile}
              className="flex items-center space-x-2 px-3 py-2 text-white hover:text-sky-300 rounded-lg transition-all duration-200"
            >
              <div className="w-8 h-8 bg-white bg-opacity-30 rounded-full flex items-center justify-center font-bold text-[#B71C1C]">
                {initial}
              </div>
              <span className="hidden lg:inline text-sm">{user?.name}</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                <a
                  href="/profile_doctor"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <User className="w-4 h-4 mr-3" />
                  Mi Perfil
                </a>
                <a
                  href="/settings"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <Settings className="w-4 h-4 mr-3" />
                  Configuraciones
                </a>
                <hr className="my-2" />
                <a
                  href="/login"
                  className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Cerrar Sesión
                </a>
              </div>
            )}
          </div>
        </div>

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
      </div>

      <div
        className={`md:hidden absolute w-full bg-[#B71C1C] transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <ul className="flex flex-col px-4 py-2">
          {navbarlinks.map((link) => (
            <li key={link.id} className="py-2 text-center">
              <a
                className="text-white hover:text-sky-300"
                href={link.link}
                onClick={() => setIsOpen(false)}
              >
                {link.tittle}
              </a>
            </li>
          ))}
        </ul>
        <div className="px-4 py-2 border-t border-white border-opacity-20">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center font-bold text-[#B71C1C]">
              {initial}
            </div>
            <div>
              <p className="text-white font-medium">{user?.name || "Doctor"}</p>
              <p className="text-red-200 text-sm">{user?.role || "Doctor"}</p>
            </div>
          </div>
          <div className="space-y-1">
            <a
              href="/profile_doctor"
              className="block text-white hover:text-sky-300 text-sm py-1"
            >
              Mi Perfil
            </a>
            <a
              href="/settings"
              className="block text-white hover:text-sky-300 text-sm py-1"
            >
              Configuraciones
            </a>
            <a
              href="/login"
              className="block text-red-200 hover:text-white text-sm py-1"
            >
              Cerrar Sesión
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DoctorNavbar;
