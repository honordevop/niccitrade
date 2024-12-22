"use client";

import { useGlobalContext } from "@/contextAPI/context";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { HiOutlineLogout } from "react-icons/hi";

const ReportTab = ({ currentPage, tabLink, changeWidth }) => {
  //   console.log(currentPage);

  const { onPageLoading } = useGlobalContext();

  return (
    <div className="w-full hideScrollBar overflow-hidden">
      {!changeWidth && (
        <p className="pl-6 pr-2 pt-4 text-[#DFE6ED] text-base font-bold ">
          Reports
        </p>
      )}

      <ul className="flex flex-col gap-1 pt-[1rem] ">
        {tabLink.map((link, i) => (
          <Link
            href={link.link}
            onClick={link.link.includes(currentPage) ? null : onPageLoading}
            shallow
            key={i}
            style={
              link.slug == currentPage
                ? { backgroundColor: "#142D3C" }
                : { backgroundColor: "transparent" }
            }
            className="px-3 py-[10px]"
          >
            <div className="flex gap-4 items-center">
              <div className=" text-base p-1 border border-white rounded-md text-[#8F9397]">
                {link.icon}
              </div>
              <p className=" text-[#DFE6ED] text-base font-bold text-nowrap">
                {link.title}{" "}
              </p>
            </div>
          </Link>
        ))}
        {/* <div
          style={{ backgroundColor: "transparent" }}
          className="pl-6 pr-2 py-4"
          onClick={() => {
            onPageLoading();
            signOut();
          }}
        >
          <div className="flex gap-5 items-center cursor-pointer">
            <div className=" text-lg p-2 border border-white rounded-md text-white">
              <HiOutlineLogout />
            </div>
            <p className=" text-white text-lg font-bold text-nowrap">Log Out</p>
          </div>
        </div> */}
      </ul>
    </div>
  );
};

export default ReportTab;
