"use client";
import React from "react";
import { StockMarket } from "react-ts-tradingview-widgets";

const Widget = () => {
  return (
    <div className="w-full">
      <StockMarket colorTheme="dark" height={300} width="100%"></StockMarket>
    </div>
  );
};

export default Widget;
