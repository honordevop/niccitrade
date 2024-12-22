"use client";
import React, { useContext, useEffect, useState } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [pageLoading, setPageLoading] = useState(true);

  const onPageLoading = () => {
    setPageLoading(true);
  };
  const offPageLoading = () => {
    setPageLoading(false);
  };
  // const getUser =
  const test = "Hello World";

  return (
    <AppContext.Provider
      value={{
        onPageLoading,
        pageLoading,
        offPageLoading,
        test,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };

export const useGlobalContext = () => {
  return useContext(AppContext);
};
