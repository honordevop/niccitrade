import Image from "next/image";
import React from "react";
import Forms from "@/components/Forms";

const Register = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center h-max md:h-[100vh] ">
      <div className="w-full flex h-full">
        <div className=" overflow-y-scroll scrollWidth0 w-full">
          <Forms />
        </div>
      </div>
    </div>
  );
};

export default Register;
