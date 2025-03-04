import React, { useState } from "react";

const HeroSupp: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:correo1@example.com,correo2@example.com?subject=Consulta de Soporte&body=Nombre: ${formData.nombre}%0AEmail: ${formData.email}%0AMensaje: ${formData.mensaje}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="container mx-auto py-12 px-4 pt-30">
      <h1 className="text-3xl font-bold text-center mb-8">Soporte</h1>

      {/* Preguntas Frecuentes (FAQ) */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Preguntas Frecuentes</h2>
        <details className="mb-4 border border-gray-300 p-4 rounded-md">
          <summary className="cursor-pointer font-medium text-red-600">
            ¿Cómo puedo registrarme?
          </summary>
          <p className="mt-2 text-gray-700">
            Para registrarte, accede a la página de inicio y haz clic en "Crear
            Cuenta".
          </p>
        </details>
        <details className="mb-4 border border-gray-300 p-4 rounded-md">
          <summary className="cursor-pointer font-medium text-red-600">
            ¿Cómo restablezco mi contraseña?
          </summary>
          <p className="mt-2 text-gray-700">
            Haz clic en "¿Olvidaste tu contraseña?" en la pantalla de inicio de
            sesión.
          </p>
        </details>
        <details className="mb-4 border border-gray-300 p-4 rounded-md">
          <summary className="cursor-pointer font-medium text-red-600">
            ¿Dónde puedo encontrar más información?
          </summary>
          <p className="mt-2 text-gray-700">
            Puedes visitar la sección "Nosotros" para conocer más sobre el
            proyecto.
          </p>
        </details>
      </div>

      {/* Formulario de Contacto */}
      <div className="max-w-2xl mx-auto mt-8 p-6 border border-gray-300 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Envíanos tu consulta</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            name="nombre"
            placeholder="Tu nombre"
            required
            value={formData.nombre}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />
          <input
            type="email"
            name="email"
            placeholder="Tu correo electrónico"
            required
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />
          <textarea
            name="mensaje"
            placeholder="Escribe tu mensaje aquí..."
            required
            rows={4}
            value={formData.mensaje}
            onChange={handleChange}
            className="border p-2 rounded-md"
          ></textarea>
          <button
            type="submit"
            className="bg-red-600 text-white font-bold px-4 py-2 rounded-md 
             hover:scale-105 transition-transform transform 
             duration-300"
          >
            Enviar Mensaje
          </button>
        </form>
      </div>
    </div>
  );
};

export default HeroSupp;
