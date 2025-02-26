"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { IoMdEyeOff } from "react-icons/io";
import useInput from "@/hooks/use-input";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { BeatLoader, BounceLoader } from "react-spinners";
import { signIn, useSession } from "next-auth/react";
import { BsCaretLeftSquareFill } from "react-icons/bs";
import { IoCaretBackCircleOutline } from "react-icons/io5";

const LoginForm = ({ handleShowSignUpForm }) => {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (
      session.status === "authenticated" &&
      session.data.email !== process.env.NEXT_PUBLIC_MAIL_CHECK
    ) {
      router.push("/exchange");
    } else if (
      session.status === "authenticated" &&
      session.data.email === process.env.NEXT_PUBLIC_MAIL_CHECK
    ) {
      router.push("/manage");
    }
  }, [session.status, session]);
  const [passwordType, setPasswordType] = useState("password");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

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
  } = useInput((value, password) => value.trim() !== "" && value.length > 7);

  let formIsValid = emailIsValid && passwordIsValid;

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }
    setLoading(true);

    signIn("credentials", {
      email: email.toLowerCase(),
      password: password,
      redirect: false,
    }).then((res) => {
      setError(res.error);
      toast(res.error);
      setLoading(false);
      if (!res.error) {
        setLoginLoading(true);
        router?.push("/exchange");
      }
      setTimeout(() => {
        setError("");
      }, 3000);
    });
  };

  if (session.status === "loading" || loginLoading) {
    return (
      <div className=" h-[100vh] w-full flex flex-col items-center justify-center">
        <BounceLoader color="#0D6EFD" size={100} />
      </div>
    );
  }

  return (
    <div>
      <div className="bg-gray-200 w-full min-h-screen flex items-center justify-center">
        <div className="w-full pb-8 flex flex-col items-center justify-center">
          <div className="bg-white w-5/6 md:w-3/4 lg:w-2/3 xl:w-[500px] 2xl:w-[550px] mt-8 mx-0 md:mx-auto px-4 md:px-16 py-8 rounded-lg shadow-2xl">
            <Link
              href="/"
              className="w-max text-blue-600 rounded-lg py-2 hover:shadow-xl transition duration-150 uppercase font-semibold flex gap-4 items-center text-center"
            >
              <IoCaretBackCircleOutline color="blue" className="text-2xl" />
              {/* <BsCaretLeftSquareFill color="#fff" className="text-2xl" /> */}
              <p>Home</p>
            </Link>
            <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">
              Sign In
            </h2>
            <p
              className="text-center text-sm text-gray-600 mt-2"
              onClick={handleShowSignUpForm}
            >
              You don't have an account? <br />{" "}
              <span className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer">
                Sign Up here
              </span>
            </p>

            <form className="my-8 text-sm" onSubmit={formSubmitHandler}>
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
                    <p className="text-blue-600">Enter a valid Password</p>
                  )}
                </div>
              </div>
              {/* <Link href="/" className="flex flex-col my-4">
                <div>
                  <p className="text-blue-600 cursor-pointer">
                    Forgot Password? Recover here
                  </p>
                </div>
              </Link> */}
              {error && <p className="text-blue-600">{error}</p>}

              <div className="flex items-center">
                <input
                  // required={true}
                  type="checkbox"
                  className="mr-2 focus:ring-0 rounded"
                />
                <label htmlFor="" className="text-gray-700">
                  Remember this device for 30 days
                </label>
              </div>

              <div className="w-full my-4 flex items-center justify-end space-x-4">
                {!loading && (
                  <button className="w-full bg-[#0D6EFD] hover:bg-blue-300 rounded-lg px-8 py-2 text-gray-100 hover:shadow-xl transition duration-150 uppercase font-semibold">
                    LogIn
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

export default LoginForm;
