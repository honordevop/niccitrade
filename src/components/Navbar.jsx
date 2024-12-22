"use client";
import React, { useState } from "react";
import { FaFlag, FaUserCheck } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { LuMenu } from "react-icons/lu";
import Link from "next/link";

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const openNav = () => {
    setShowNav((prev) => !prev);
  };
  return (
    <div className="w-full px-5 bg-white min-h-20 flex flex-col items-center justify-center box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.06); relative">
      <div className="container flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <div className="font-bold text-lg primaryColor">NICCI</div>
          <div className="font-semibold hidden md:block">1 BTC (USD) = ?</div>
        </div>
        <div className="hidden md:block">
          <div className="flex gap-5">
            <Link href="#" className="flex gap-2 items-center">
              <FaFlag className="primaryColor" />
              Pricing
            </Link>
            <Link href="/auth" className="flex gap-2 items-center">
              <FaUserCheck className="primaryColor" />
              Sign Up
            </Link>
            <Link href="/auth" className="flex gap-2 items-center">
              <FaUserAlt className="primaryColor" /> Login
            </Link>
          </div>
        </div>

        <div className="font-semibold md:hidden">1 BTC (USD) = ?</div>

        <div
          className="flex items-center md:hidden justify-center cursor-pointer"
          onClick={() => {
            openNav();
          }}
        >
          <LuMenu className="text-lg" />
        </div>
      </div>
      {showNav && (
        <div className="md:hidden h-20 absolute top-20 bg-white w-full flex px-6">
          <div className="flex gap-5">
            <Link href="#" className="flex gap-2 items-center">
              <FaFlag className="primaryColor" />
              Pricing
            </Link>
            <Link href="/auth" className="flex gap-2 items-center">
              <FaUserCheck className="primaryColor" />
              Sign Up
            </Link>
            <Link href="/auth" className="flex gap-2 items-center">
              <FaUserAlt className="primaryColor" /> Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
