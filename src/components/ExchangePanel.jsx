"use client";
import React, { useState } from "react";
import Calculator from "./Calculator";
import { RiAlertFill } from "react-icons/ri";
import OrderCart from "./OrderCart";

const ExchangePanel = ({ userEmail }) => {
  const [showOrderCart, setShowOrderCart] = useState(false);

  const [order, setOrder] = useState({
    send: "",
    sendCurrency: "",
    receive: "",
    receiveCurrency: "",
  });

  const orderCartShowHandler = () => {
    setShowOrderCart((prev) => !prev);
  };

  const orderCartHideHandler = () => {
    setShowOrderCart(false);
  };

  const getOrderdetails = (sendValue, selectedKey, receive, selectedName) => {
    // console.log(
    //   `Send us ${sendValue} ${selectedKey} and Receive ${receive} ${selectedName}`
    // );
    setOrder({
      send: sendValue,
      sendCurrency: selectedKey,
      receive: receive,
      receiveCurrency: selectedName,
    });
  };
  // console.log()
  return (
    <div className=" w-full px-1 flex flex-col justify-center mt-10">
      <div className="w-full mb-10 container flex flex-col md:flex-row gap-8 items-center justify-center border-l-4 border-blue-600 px-5">
        <div className="flex-1">
          <Calculator
            showOrder={orderCartShowHandler}
            getOrderdetails={getOrderdetails}
          />
        </div>
        <div className="flex-1 flex flex-col gap-5">
          <h3 className=" flex gap-5 items-center  w-full font-bold">
            {" "}
            <RiAlertFill className="text-blue-600 text-xl" />
            Getting Started
          </h3>
          <p>
            The Pay Online System enables you to make payment using your debit
            card and get credited instantly and With the Exchange button, you
            can convert between any listed currency of your choice. <br /> It
            has always been our tradition for excellent service, speed delivery
            and total dedicated customer support. We are committed to what we do
            best to Nigerians and the entire world the best they deserve!
          </p>
        </div>
      </div>
      {showOrderCart && (
        <OrderCart
          hideForm={orderCartHideHandler}
          order={order}
          userEmail={userEmail}
        />
      )}
    </div>
  );
};

export default ExchangePanel;
