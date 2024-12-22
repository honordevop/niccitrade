"use client";
import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import { useSession } from "next-auth/react";

const Forms = () => {
  const session = useSession();

  // console.log(session.status);

  const [showSignUp, setShowSignUp] = useState(false);

  const handleShowSignUpForm = () => {
    setShowSignUp(true);
  };

  const handleHideSignUpForm = () => {
    setShowSignUp(false);
  };
  return (
    <div className="w-full">
      {showSignUp && <SignUpForm handleHideSignUpForm={handleHideSignUpForm} />}
      {!showSignUp && <LoginForm handleShowSignUpForm={handleShowSignUpForm} />}
    </div>
  );
};

export default Forms;
