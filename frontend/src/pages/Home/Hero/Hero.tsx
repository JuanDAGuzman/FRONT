import React from "react";
import Personaje from "../../../assets/personaje.png";
import Logo from "../../../assets/logo2.png";

const Hero: React.FC = () => {
  return (
    <section className="mt-36 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center px-8 py-4">
        {/* Columna izquierda: Logo + Texto */}
        <div className="flex flex-col items-center text-center gap-y-4">
          <img className="w-[400px] md:w-[500px]" src={Logo} alt="Logo2-app" />

          <p className="text-black px-4 py-2 max-w-2xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
            accusamus nihil nulla inventore, laudantium quaerat delectus ut
            corrupti recusandae vero placeat officiis repudiandae exercitationem
            voluptatibus sunt enim. In laudantium dolores similique amet quasi
            optio, odit facere sapiente est expedita, corporis quod molestiae
            alias. Natus magnam quibusdam beatae voluptatibus provident
            laudantium.
          </p>

          <div className="flex justify-center gap-4">
            <a href="#" className="text-blue-600 flex items-center gap-2">
              Únete Ahora <i className="bi bi-arrow-right-square-fill"></i>
            </a>
          </div>

          <p className="text-black px-4 py-2 max-w-2xl">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad odio
            suscipit architecto. Aspernatur, dolore? Placeat, laudantium nulla!
            Dolore qui deleniti molestiae fuga dolorum velit eius vitae, a quasi
            quaerat cumque quod atque maxime rerum possimus minus quas tempore
            nulla, repellat esse explicabo? Officiis, asperiores expedita
            aliquid doloribus quas libero autem?
          </p>

          <div className="flex justify-center gap-4">
            <a href="#" className="text-blue-600 flex items-center gap-2">
              Saber más <i className="bi bi-arrow-right-square-fill"></i>
            </a>
          </div>
        </div>

        {/* Columna derecha: Imagen del personaje */}
        <div className="flex justify-center">
          <img
            className="max-w-xs md:max-w-md"
            src={Personaje}
            alt="Personaje-app"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
