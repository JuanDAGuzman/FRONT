import React from "react";
import Personaje from "../../../assets/personaje.png";
import Logo from "../../../assets/logo2.png";

const Hero: React.FC = () => {
  return (
    <section className="mt-36 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>Texto</div>
        <img src={Logo} alt="Logo2-app" />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
          accusamus nihil nulla inventore, laudantium quaerat delectus ut
          corrupti recusandae vero placeat officiis repudiandae exercitationem
          voluptatibus sunt enim. In laudantium dolores similique amet quasi
          optio, odit facere sapiente est expedita, corporis quod molestiae
          alias. Natus magnam quibusdam beatae voluptatibus provident
          laudantium.
        </p>
        <div className="flex justify-center gap-4">
          <a>Unete Ahora <i className="bi bi-arrow-right-square-fill"></i></a>
        </div>
        <div>
          <img src={Personaje} alt="Personaje-app" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
