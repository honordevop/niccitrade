import React from "react";
import Calculator from "./Calculator";
import Widget from "./Widget";

const HeroSection = () => {
  return (
    <div className=" w-full px-1 flex flex-col items-center justify-center mt-20">
      <div className="w-full container flex flex-col md:flex-row gap-8 md:gap-5 items-center justify-center border-l-4 border-blue-600 px-5">
        <div className="flex-1">
          <Calculator />
        </div>
        <div className="flex-1">
          <Widget />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
