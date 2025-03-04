import React from "react";

const developers = [
  {
    name: "Juan Diego Arevalo",
    github: "https://github.com/JuanDAGuzman",
    info: "Desarrollador Full Stack con experiencia en React y Node.js.",
  },
  {
    name: "Camilo Andres Gomez",
    github: "https://github.com/CamAGomezB27",
    info: "Especialista en UI/UX y desarrollo frontend con React y Tailwind CSS.",
  },
  {
    name: "Felipe Cruz",
    github: "https://github.com/carlosramirez",
    info: "Desarrollador Backend enfocado en APIs con Express y MongoDB.",
  },
];

const HeroUs: React.FC = () => {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Nosotros</h1>
      <div className="flex flex-wrap justify-center gap-6">
        {developers.map((dev, index) => (
          <div
            key={index}
            className="bg-white shadow-lg p-6 rounded-lg w-72 text-center border border-gray-200 transition-all duration-300 hover:bg-sky-100 hover:shadow-xl"
          >
            <i className="bi bi-github text-4xl text-gray-900"></i>
            <h2 className="text-xl font-semibold mt-2">{dev.name}</h2>
            <p className="text-gray-600 text-sm mt-2">{dev.info}</p>
            <a
              href={dev.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-[#B71C1C]  font-semibold transition-transform hover:scale-110 duration-300"
            >
              Ver perfil en GitHub
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroUs;
