import React, { useState } from "react";
import Tabs from "./DashBoardTabs/Tabs";
import { UserTabsLink } from "@/Utils/store";
import { usePathname } from "next/navigation";

const DesktopMenu = ({}) => {
  const pathname = usePathname();

  const currentPage = pathname ? pathname.split("/").pop() : "";
  return (
    <>
      <div
        className={`h-full transitionWidth hideDivMax1024 w-[15rem] bg-gray-200`}
        id="leftTab"
        // style={{ width: `${leftWidth}rem` }}
      >
        <Tabs currentPage={currentPage} tabLink={UserTabsLink} />
      </div>
    </>
  );
};

export default DesktopMenu;
