import Link from "next/link";
import React from "react";
import { FaEnvelope } from "react-icons/fa6";
import { MdAddCall } from "react-icons/md";

const Footer = () => {
  return (
    <>
      <div className="px-5 my-10 container flex items-center justify-between">
        <div className="flex-1 flex flex-col md:flex-row gap-5 md:gap-[10rem]">
          <div>
            <h3 className="font-semibold mb-5">Customer</h3>
            <ul className="flex flex-col text-sm gap-2">
              <Link href="/auth">Login</Link>
              <Link href="/auth">Sign Up</Link>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-5">Privacy</p>

            <ul className="flex flex-col text-sm gap-2">
              <Link href="/">Terms & Conditions</Link>
              <Link href="/">Privacy</Link>
            </ul>
          </div>
        </div>

        <div className="flex-1 flex flex-col md:flex-row justify-between gap-5">
          <div className="md:pl-10">
            <h3 className="font-semibold mb-5">Support</h3>
            <ul className="flex flex-col text-sm gap-2">
              <Link href="/" className="flex gap-2 items-center">
                <FaEnvelope />
                08027198588
              </Link>
              <Link href="/" className="flex gap-2 items-center">
                <MdAddCall />
                08131119833
              </Link>
            </ul>
          </div>

          <div>
            <p className="font-semibold mb-5">Social Media</p>

            <ul className="flex flex-col text-sm gap-2">
              <Link href="/">Facebook</Link>
              <Link href="/">Twitter</Link>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full py-9 border-t-2 flex justify-center">
        <div className="container text-center md:text-left px-5">
          <p>
            This application is licensed to Nicci Exchange © 2024. Trade. All
            rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
