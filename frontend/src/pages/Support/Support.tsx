import React from "react";
import HeroSupp from "./HeroSupp.tsx/HeroSupp";
import Navbar from "./../Home/NavBar/Navbar";

const Us: React.FC = () => {
  return (
    <div>
        <Navbar></Navbar>
        <HeroSupp></HeroSupp>
    </div>
  );
};

export default Us;