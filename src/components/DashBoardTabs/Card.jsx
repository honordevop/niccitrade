// import { cardDetails } from "@/Utils/store";
import React from "react";
import { FaHospitalAlt } from "react-icons/fa";
import { FaUserDoctor, FaUserTag, FaUserTie } from "react-icons/fa6";
import { GiLabCoat } from "react-icons/gi";

const Card = ({ profileData }) => {
  const items = [
    {
      title: "300",
      value: "Hospitals",
      icon: <FaHospitalAlt />,
    },
    {
      title: "4000",
      value: "Doctors",
      icon: <FaUserDoctor />,
    },
    {
      title: "2000",
      value: "Laboratorist",
      icon: <GiLabCoat />,
    },
    {
      title: "20,000",
      value: "Patients",
      icon: <FaUserTag />,
    },
    // {
    //   title: "36",
    //   value: "States",
    //   icon: <RiBuilding2Line />,
    // },
    // {
    //   title: "Email",
    //   value: profileData?.data.workEmail,
    //   icon: <MdOutlineLocalPostOffice />,
    // },
  ];

  return (
    <div className=" flex gap-8 flex-wrap text-[#6B7281] mt-10 items-center">
      {items?.map((item, i) => (
        <div
          key={i}
          className=" flex gap-7 border border-gray-300 w-[22rem] p-2 rounded-md cursor-pointer"
        >
          <div className="p-2 h-max text-5xl primaryBgColor rounded-md text-white">
            {item.icon}
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-lg font-bold">{item.title} </p>
            <p className="font-bold text-wrap">{item.value} </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
