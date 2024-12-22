import React from "react";
import Card from "./Card";

const DashBoardPannel = ({ profileData }) => {
  // console.log(profileData);
  return (
    <div className="w-full">
      {/* <div className=" flex flex-col items-center justify-center gap-4 my-8 ">
        <p className="text-xl font-bold text-center">
          Hi, {`${profileData?.fullname}`} - Welcome to IGTA Dashboard
        </p>
      </div> */}
      <Card profileData={profileData} />
    </div>
  );
};

export default DashBoardPannel;
