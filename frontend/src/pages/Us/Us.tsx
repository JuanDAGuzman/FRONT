import React from "react";
import Navbar from "../Home/NavBar/Navbar";
import Footer from "../Home/Footer/Footer";
import HeroUs from "../Us/Hero/HeroUs";


const Us: React.FC = () => {
  return (
    <div>
      <Navbar></Navbar>
      <HeroUs></HeroUs>
      <Footer></Footer>
    </div>
  );
};

export default Us;
