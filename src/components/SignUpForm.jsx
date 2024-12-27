"use client";
import Link from "next/link";
import React, { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { IoMdEyeOff } from "react-icons/io";
import Image from "next/image";
import useInput from "@/hooks/use-input";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { BeatLoader } from "react-spinners";

const SignUpForm = ({ handleHideSignUpForm }) => {
  const router = useRouter();
  const [passwordType, setPasswordType] = useState("password");

  const [show, setShow] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const showPassword = () => {
    setPasswordType("text");
    setShow(true);
  };
  const hidePassword = () => {
    setPasswordType("password");
    setShow(false);
  };

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailInputReset,
  } = useInput((value) => value.includes("@"));

  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordInputReset,
  } = useInput((value) => value.trim() !== "" && value.length > 7);

  const {
    value: passwordCheck,
    isValid: passwordCheckIsValid,
    hasError: passwordCheckHasError,
    valueChangeHandler: passwordCheckChangeHandler,
    inputBlurHandler: passwordCheckBlurHandler,
    reset: passwordCheckInputReset,
  } = useInput((value) => value === password);

  const {
    value: fullName,
    isValid: fullNameIsValid,
    hasError: fullNameHasError,
    valueChangeHandler: fullNameChangeHandler,
    inputBlurHandler: fullNameBlurHandler,
    reset: fullNameInputReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: mobileNumber,
    isValid: mobileNumberIsValid,
    hasError: mobileNumberHasError,
    valueChangeHandler: mobileNumberChangeHandler,
    inputBlurHandler: mobileNumberBlurHandler,
    reset: mobileNumberInputReset,
  } = useInput((value) => value.trim() !== "");

  //   const {
  //     errorMessage: loginErrorMessage,
  //     setErrorMessage: setLoginErrorMessage,
  //   } = useError();

  let formIsValid =
    emailIsValid &&
    passwordIsValid &&
    fullNameIsValid &&
    mobileNumberIsValid &&
    passwordCheckIsValid;

  const sendWelcomeEmail = async () => {
    try {
      const res = await fetch("/api/sendmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          fullname: fullName,
        }),
      });
      const data = await res.json();
      //   console.log(res.status);
      // toast(data.message);
    } catch (error) {
      // console.log(error);
      // setLoading(false);
      // toast.warn(error.message);
    }
  };
  const register = async () => {
    // console.log(`${email} + ${password} + ${firstName} + ${lastName} `);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: fullName,
          email,
          mobilenumber: mobileNumber,
          password,
        }),
      });
      // const data = await res.json();
      const data = await res.json();
      // console.log(data);
      toast(data.message);
      // sendWelcomeEmail();
      //   res.status === 201 && setRegSuccess(true);
      setTimeout(() => {
        emailInputReset();
        passwordInputReset();
        passwordCheckInputReset();
        fullNameInputReset();
        mobileNumberInputReset();
      }, 2000);
      setLoading(false);
      setTimeout(() => {
        if (res.status === 201) {
          router.push("/auth?success=Account has been created");
        }
      }, 3000);
    } catch (error) {
      // console.log(error);
      //   setLoginErrorMessage(error.response.data.message);
      setLoading(false);
      toast.warn(error.message);
    }
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    setLoading(true);

    // console.log("hello");
    const userEntries = {
      email: email,
      password: password,
      mobileNumber,
      fullname: fullName,
      passwordCheck: passwordCheck,
    };

    // console.log(`${firstName} ${lastName} ${password} ${passwordCheck}`)

    // console.log(userEntries);

    register();

    // console.log(userInput);
    // setOtpVerificationStarted(true);
    // setUserInput(userEntries)

    // setTimeout(() => {
    //   emailInputReset();
    //   passwordInputReset();
    //   passwordCheckInputReset();
    //   firstNameInputReset();
    //   lastNameInputReset();
    // }, 10000);
  };
  return (
    <div>
      <div className="bg-gray-200 w-full min-h-screen flex items-center justify-center">
        <div className="w-full pb-8 flex flex-col items-center justify-center">
          <div className="bg-white w-5/6 md:w-3/4 lg:w-2/3 xl:w-[500px] 2xl:w-[550px] mt-8 mx-0 md:mx-auto px-4 md:px-16 py-8 rounded-lg shadow-2xl">
            <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">
              Sign Up
            </h2>
            <p
              className="text-center text-sm text-gray-600 mt-2"
              onClick={handleHideSignUpForm}
            >
              Already have an account? <br />{" "}
              <span className="text-blue-600 hover:text-blue-700 font-bold hover:underline cursor-pointer">
                Sign in here
              </span>
            </p>

            <form className="my-8 text-sm" onSubmit={formSubmitHandler}>
              <div className="flex flex-col my-4">
                <input
                  type="text"
                  className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                  placeholder="Enter your Fullname"
                  value={fullName}
                  onBlur={fullNameBlurHandler}
                  onChange={fullNameChangeHandler}
                />

                {fullNameHasError && (
                  <p className="text-blue-600">Enter a valid Input</p>
                )}
              </div>

              <div className="flex flex-col my-4">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                  placeholder="Email Address"
                  value={email}
                  onBlur={emailBlurHandler}
                  onChange={emailChangeHandler}
                />
                {emailHasError && (
                  <p className="text-blue-600">Enter a valid Email</p>
                )}
              </div>

              <div className="flex flex-col my-4">
                <input
                  type="number"
                  name="mobileNumber"
                  id="mobileNumber"
                  className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                  placeholder="Mobile"
                  value={mobileNumber}
                  onBlur={mobileNumberBlurHandler}
                  onChange={mobileNumberChangeHandler}
                />
                {mobileNumberHasError && (
                  <p className="text-blue-600">Enter a mobile number</p>
                )}
              </div>

              <div className="flex flex-col my-4">
                <div>
                  <div className="relative flex items-center mt-2 border border-gray-300 rounded">
                    <input
                      className="w-[95%] p-2 pr-10 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                      placeholder="Enter your password"
                      onChange={passwordChangeHandler}
                      onBlur={passwordBlurHandler}
                      type={passwordType}
                    />
                    {show && (
                      <AiFillEye
                        className="cursor-pointer text-[#aba9a9] text-[20px] absolute top-2 right-2"
                        onClick={hidePassword}
                      />
                    )}
                    {!show && (
                      <IoMdEyeOff
                        className="cursor-pointer text-[#aba9a9] text-[20px] absolute top-2 right-2"
                        onClick={showPassword}
                      />
                    )}
                  </div>
                  {passwordHasError && (
                    <p className="text-blue-600">
                      Enter a valid Password of atleast 8 characters
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col my-4">
                <div>
                  <div className="relative flex items-center mt-2 border border-gray-300 rounded">
                    <input
                      className="w-[95%] p-2 pr-10 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                      placeholder="Enter your password"
                      onChange={passwordCheckChangeHandler}
                      onBlur={passwordCheckBlurHandler}
                      type={passwordType}
                    />
                  </div>
                  {passwordCheckHasError && (
                    <p className="text-blue-600">Password does not match</p>
                  )}
                </div>
              </div>

              <div className="flex items-center">
                <input
                  required={true}
                  type="checkbox"
                  className="mr-2 focus:ring-0 rounded"
                />
                <label htmlFor="" className="text-gray-700">
                  I accept the terms of service
                </label>
              </div>

              <div className="w-full my-4 flex items-center justify-end space-x-4">
                {!loading && (
                  <button className="w-full bg-blue-600 hover:bg-blue-400 rounded-lg px-8 py-2 text-gray-100 hover:shadow-xl transition duration-150 uppercase font-semibold">
                    Sign Up
                  </button>
                )}
                {loading && (
                  <div className="w-full flex items-center justify-center">
                    <BeatLoader color="#0D6EFD" />
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
