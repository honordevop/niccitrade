import React from "react";
import { IoBriefcaseOutline, IoGiftOutline } from "react-icons/io5";
import { RiWirelessChargingFill } from "react-icons/ri";

const Banner = () => {
  return (
    <div className="mt-24 container flex flex-col md:flex-row gap-8 mb-16 px-5">
      <div className="flex-1 shadow-xl p-5 rounded-md border-t-[3px] border-blue-600">
        <h3 className="font-semibold mb-2 flex gap-2 items-center">
          {" "}
          <IoBriefcaseOutline />
          Direct Exchanger
        </h3>
        <p>
          Bitcoin and other digital currencies are instantly available on our
          automated exchange platform.
        </p>
      </div>
      <div className="flex-1 shadow-xl p-5 rounded-md border-t-[3px] border-gray-600">
        <h3 className="font-semibold mb-2 flex gap-2 items-center">
          <RiWirelessChargingFill />
          Instant Transaction
        </h3>
        <p>
          Bitcoin and other digital currencies are instantly available on our
          automated buy and sell system.
        </p>
      </div>
      <div className="flex-1 shadow-xl p-5 rounded-md border-t-[3px] border-green-800">
        <h3 className="font-semibold mb-2 flex gap-2 items-center">
          <IoGiftOutline />
          Special Offers
        </h3>
        <p>
          Bitcoin and other digital currencies are instantly available on our
          automated buy and sell system.
        </p>
      </div>
    </div>
  );
};

export default Banner;
