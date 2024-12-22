"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import useInput from "@/hooks/use-input";
import { toast } from "react-toastify";
import { BeatLoader, ClimbingBoxLoader } from "react-spinners";
import { MdOutlineCloudDone } from "react-icons/md";
import { currencyAddress } from "@/Utils/store";
import useRData from "@/hooks/useRData";

const EditAddress = ({ hideForm, mutate, userEmail, id }) => {
  const [regSuccess, setRegSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState("");
  const [addressText, setAddressText] = useState("");
  const [desc, setDesc] = useState("");

  const fetchData = async (id) => {
    // console.log("called");
    setLoading(true);
    try {
      const response = await fetch(`/api/address/${id}`);

      const res = await response.json();
      const data = res.address;
      //   console.log(data);
      setCurrency(data?.currency);
      setAddressText(data?.address);
      setDesc(data?.desc);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      // setError(error?.response);
      setLoading(false);
      toast(error?.message);

      // console.log(error);
    }
  };

  useEffect(() => {
    fetchData(id);
  }, [id]);

  const [error, setError] = useState();

  //   useEffect(() => {
  //     fetchData(`/api/address/${id}`);
  //   }, [id]);

  //   console.log(addres);

  const formIsValid = (value) => value.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    formIsValid(desc);
    if (!formIsValid) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/address/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          desc,
        }),
      });

      mutate();
      const data = await res.json();
      //   console.log(data);
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
                    Currency
                  </label>
                  <input
                    name="currency"
                    disabled
                    className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                    value={currency}
                  />
                </div>
              </div>

              <div className="">
                <label htmlFor="" className="font-semibold">
                  Address
                </label>
                <div className="w-full border border-gray-300 focus:border-gray-300 focus:outline-none focus:ring-0  rounded">
                  <textarea
                    className="w-full p-2  focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                    placeholder="Enter Address"
                    disabled
                    name="address"
                    // onChange={handleChange}
                    value={addressText}
                  ></textarea>
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between my-4 w-full gap-4">
                <div className="flex-1 flex flex-col">
                  <label htmlFor="" className="font-semibold">
                    Description
                  </label>
                  <input
                    type="text"
                    required
                    name="desc"
                    className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                    placeholder="The address decription"
                    // onChange={handleChange}
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </div>
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
                      Update
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
            <p className="text-lg font-semibold">Address Saved Updated</p>
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

export default EditAddress;
