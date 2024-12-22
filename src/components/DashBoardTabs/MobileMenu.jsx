import React, { useState } from "react";
import { RxCaretDown } from "react-icons/rx";
import MobileTab from "./MobileTab";

const MobileMenu = ({ currentPage, tabLink }) => {
  const [showMobileNav, setShowMobileNav] = useState(false);

  const handleShowMobileNav = () => {
    // console.log("hi");
    setShowMobileNav((prev) => !prev);
  };
  return (
    <div
      className=" flex flex-col items-center justify-between bg-white boxShadow mx-5 mt-10 rounded-md cursor-pointer relative hideDivMin1025"
      onClick={() => handleShowMobileNav()}
    >
      <div className="w-full flex items-center justify-between py-2 px-7">
        <p className="text-lg font-bold">
          {" "}
          {currentPage.charAt(0).toUpperCase() +
            currentPage.slice(1).toLowerCase()}{" "}
        </p>
        <RxCaretDown className="text-lg" />
      </div>

      {showMobileNav && (
        <MobileTab currentPage={currentPage} tabLink={tabLink} />
      )}
    </div>
  );
};

export default MobileMenu;
