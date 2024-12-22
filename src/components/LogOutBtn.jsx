"use client";
import { signOut } from "next-auth/react";
import React from "react";
import { TbLogout } from "react-icons/tb";

const LogOutBtn = () => {
  return (
    <div
      style={{ backgroundColor: "transparent" }}
      className=""
      onClick={() => {
        // onPageLoading();
        signOut();
      }}
    >
      <div className="flex gap-5 items-center cursor-pointer" title="Log-Out">
        <div className=" p-1 text-white">
          {/* <TbLogout /> */}
          Sign Out
        </div>
      </div>
    </div>
  );
};

export default LogOutBtn;
