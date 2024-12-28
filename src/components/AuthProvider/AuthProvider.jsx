"use client";

import { SessionProvider } from "next-auth/react";
import React, { useEffect } from "react";

const AuthProvider = ({ children }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://embed.tawk.to/676f2886af5bfec1dbe36819/1ig53ck6t";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    const firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode.insertBefore(script, firstScript);

    return () => {
      // Cleanup: Remove the script when the component unmounts
      script.parentNode?.removeChild(script);
    };
  }, []);
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
