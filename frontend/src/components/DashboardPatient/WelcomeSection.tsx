import React from "react";

interface WelcomeSectionProps {
  userName?: string;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  userName = "Nombre",
}) => {
  // Toma la primera letra, en mayúscula, aunque el usuario escriba todo en minúsculas
  const initial = userName.trim().charAt(0).toUpperCase();

  return (
    <div className="mb-8">
      <div className="bg-[#B71C1C] rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              ¡Bienvenido, {userName}!
            </h1>
            <p className="text-red-100">Esta es tu sección personal</p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-[#B71C1C] font-bold text-lg">
                  {initial}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
