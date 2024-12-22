"use client";
import React, { useEffect, useState } from "react";
import Tabs from "./DashBoardTabs/Tabs";
import { usePathname } from "next/navigation";
import { UserTabsLink } from "@/Utils/store";

const SideMenu = ({ activateSideMenu, showSideMenu }) => {
  const pathname = usePathname();

  const [sideMenuWidth, setSideMenuWidth] = useState("1");

  const currentPage = pathname ? pathname.split("/").pop() : "";

  useEffect(() => {
    changeSideMenuWidth();
  }, [showSideMenu, sideMenuWidth]);

  const changeSideMenuWidth = () => {
    if (showSideMenu) {
      setSideMenuWidth("100");
    }
    if (!showSideMenu) {
      setSideMenuWidth("1");
    }
  };

  return (
    <>
      {/* <style jsx>{`
        .sidebar-width {
          width: ${sideMenuWidth}vw !important; 
        }
      `}</style> */}
      <div
        className="sidebar-width darkOverlay w-full h-full absolute top-16 left-0"
        onClick={() => activateSideMenu()}
      >
        <div
          className={`h-full w-full transitionWidth bg-gray-100`}
          // style={{ width: `${leftWidth}rem` }}
        >
          <div className="w-max">
            <Tabs currentPage={currentPage} tabLink={UserTabsLink} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
