"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import useInput from "@/hooks/use-input";
import { toast } from "react-toastify";
import { BeatLoader, ClimbingBoxLoader } from "react-spinners";
import { MdOutlineCloudDone } from "react-icons/md";
import { currencyAddress } from "@/Utils/store";

const ExchangeForm = ({ hideForm }) => {
  const [regSuccess, setRegSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    value: exchange,
    isValid: exchangeIsValid,
    hasError: exchangeHasError,
    valueChangeHandler: exchangeChangeHandler,
    inputBlurHandler: exchangeBlurHandler,
    reset: exchangeInputReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: amount,
    isValid: amountIsValid,
    hasError: amountHasError,
    valueChangeHandler: amountChangeHandler,
    inputBlurHandler: amountBlurHandler,
    reset: amountInputReset,
  } = useInput((value) => value.trim() !== "");

  const [error, setError] = useState();

  const [inputs, setInputs] = useState({
    currency: "",
    address: "",
    desc: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  let formIsValid = exchangeIsValid && amountIsValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/exchanges", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          exchange,
          amount,
        }),
      });

      //   mutate();
      const data = await res.json();
      // console.log(data);
      toast(data?.message);
      setLoading(false);
      setRegSuccess(true);
      //   router.push(`/product/${data.id}`);
    } catch (error) {
      // console.log(error);
      setLoading(false);
      toast.warn(error?.message);
    }
    // console.log(inputs);
  };

  //   const {
  //     errorMessage: loginErrorMessage,
  //     setErrorMessage: setLoginErrorMessage,
  //   } = useError();

  const createEvent = async () => {
    setLoading(true);
    // console.log(`${email} + ${password} + ${firstName} + ${lastName} `);
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          duration,
          image,
          description,
          facilitator,
          time,
          mode,
          location,
          link,
        }),
      });
      // const data = await res.json();
      const data = await res.json();
      //   console.log(data);
      toast(data.message);
      //   sendmail();
      //   dateInputReset();
      //   titleInputReset();
      //   imageInputReset();
      //   descriptionInputReset();
      //   facilitatorInputReset();
      //   timeInputReset();
      //   modeInputReset();
      //   locationInputReset();
      //   linkInputReset();
      setLoading(false);
      setRegSuccess(true);
      // setTimeout(() => {
      //   if (res.status === 201) {
      //     router.push("/dashboard/account?success=Account has been created");
      //   }
      // }, 3000);
      // toast("Account Created Successfully");
    } catch (error) {
      // console.log(error);
      //   setLoginErrorMessage(error.response.data.message);
      setLoading(false);
      toast.warn(error.message);
    }
  };

  //   const formSubmitHandler = (event) => {
  //     event.preventDefault();
  //     if (!formIsValid) {
  //       return;
  //     }
  //     setLoading(true);

  //     // console.log("hello");
  //     const userEntries = {
  //       email: email,
  //       facility,
  //       name: fullName,
  //     };

  //     // console.log(`${firstName} ${lastName} ${password} ${passwordCheck}`)

  //     // console.log(userEntries);

  //     // sendMail();
  //     register();
  //   };

  // if (loading) {
  //   return (
  //     <div className="w-full h-screen absolute top-0 left-0 bg-[#00000086]  flex items-center justify-center">
  //       <ClimbingBoxLoader color="#007bff" />
  //     </div>
  //   );
  // }

  // if (regSuccess) {
  //   return (
  //     <div className="w-full h-screen absolute top-0 left-0 bg-[#00000086]  flex items-center justify-center">
  //       <div className="flex flex-col gap-4">
  //         <MdOutlineCloudDone color="#007bff" className="text-7xl" />

  //         <div>Close</div>
  //       </div>
  //     </div>
  //   );
  // }
  return (
    <div
      className={`w-full h-screen absolute top-0 left-0 right-0 z-[5] bg-[#00000086]  flex items-center justify-center`}
    >
      {!loading && !regSuccess && (
        <div className="w-full pb-8 flex flex-col items-center  h-full bg-yellosw-200">
          <div className="realtive bg-white h-max w-5/6 md:w-3/4 lg:w-2/3 xl:w-3/4 mt-12 mx-0 md:mx-auto px-4 md:px-16 rounded-lg shadow-2xl overflow-auto relative">
            <form
              className="mt-14 text-sm flex flex-col gap-5"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col md:flex-row justify-between my-4 w-full gap-4">
                <div className="flex-1 flex flex-col">
                  <label htmlFor="" className="font-semibold">
                    Exchange
                  </label>
                  <input
                    name="exchange"
                    value={exchange}
                    className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                    onChange={exchangeChangeHandler}
                    onBlur={exchangeBlurHandler}
                  />
                  {exchangeHasError && (
                    <p className="text-blue-500">Enter valid exchange name</p>
                  )}
                </div>
              </div>

              <div className="">
                <label htmlFor="" className="font-semibold">
                  Amount (USD)
                </label>
                <div className="w-full border border-gray-300 focus:border-gray-300 focus:outline-none focus:ring-0  rounded">
                  <input
                    className="w-full p-2  focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                    placeholder="Enter value"
                    required
                    name="amount"
                    // onChange={handleChange}
                    value={amount}
                    onChange={amountChangeHandler}
                    onBlur={amountBlurHandler}
                  />
                </div>
                {amountHasError && (
                  <p className="text-blue-500">Enter a valid input</p>
                )}
              </div>

              <div className="w-full my-4 flex items-center justify-end space-x-4">
                {!loading && (
                  <div className="flex gap-5">
                    <button
                      className="w-full bg-gray-200 hover:bg-gray-50 rounded-lg px-8 py-2 text-black hover:shadow-xl transition duration-150 uppercase font-semibold"
                      onClick={hideForm}
                    >
                      Close
                    </button>
                    <button
                      className="w-full bg-blue-600 hover:bg-blue-200 rounded-lg px-8 py-2 text-gray-100 hover:text-black hover:shadow-xl transition duration-150 uppercase font-semibold"
                      // onClick={() => createEvent()}
                    >
                      Save
                    </button>
                  </div>
                )}
                {loading && (
                  <div className="w-full flex items-center justify-center">
                    <BeatLoader color="#293E52" />
                  </div>
                )}
              </div>
            </form>

            <div
              className=" absolute top-3 right-3 text-4xl cursor-pointer"
              onClick={hideForm}
            >
              <AiOutlineCloseCircle />
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div className="">
          <ClimbingBoxLoader color="#0D6EFD" size={30} />
        </div>
      )}
      {regSuccess && (
        <div className=" bg-white w-[70%] h-[30%] flex flex-col items-center justify-center">
          <div className="flex flex-col gap-4 items-center justify-center">
            <MdOutlineCloudDone color="#293E52" className="text-7xl" />
            <p className="text-lg font-semibold">Exchange Saved Succesfully</p>
            <div
              className="px-5 py-2 bg-blue-600 font-semibold text-lg text-white rounded-lg cursor-pointer"
              onClick={() => {
                hideForm();
                setRegSuccess(false);
              }}
            >
              Close
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExchangeForm;
