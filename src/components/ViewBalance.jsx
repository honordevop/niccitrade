"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import useRData from "@/hooks/useRData";
import useSWR from "swr";
import MoneyUpdate from "./MoneyUpdate";

const ViewBalance = ({ hideForm, userEmailAddress, id }) => {
  const { data, fetchData, error: err } = useRData();
  const [loading, setLoading] = useState(true);

  // Initialize states with empty strings or null for when data is not available
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [input, setInput] = [{ currency: "", amount: "" }];

  // Fetch address data when `id` changes

  useEffect(() => {
    setLoading(true); // Set loading to true before fetching data
    try {
      fetchData(`/api/user?email=${userEmailAddress}`);
      setLoading(false); // Set loading to false once data is fetched
    } catch (err) {
      setLoading(false); // Set loading to false even if an error occurs
      toast.error("Failed to load address");
    }
  }, [userEmailAddress]);

  // Update the form fields after data is fetched
  useEffect(() => {
    if (data?.user) {
      setFullname(data?.user?.fullname);
      setEmail(data?.user?.email);
      setMobileNumber(data?.user?.mobilenumber);
    }
  }, [data?.user]);

  //   console.log(moneyRecord?.moneyRecord[0]?.moneyrecord);

  return (
    <div className="w-full h-screen absolute top-0 left-0 right-0 z-[5] bg-[#00000086]  flex items-center justify-center">
      <div className="w-full pb-8 flex flex-col items-center  h-full bg-yellosw-200">
        <div className="relative bg-white h-max w-5/6 md:w-3/4 lg:w-2/3 xl:w-3/4 mt-12 mx-0 md:mx-auto px-4 md:px-16 rounded-lg shadow-2xl overflow-auto">
          {loading ? (
            <div className="w-full flex items-center my-8 justify-center">
              Loading ...
            </div>
          ) : (
            <form className="mt-14 text-sm flex flex-col gap-5">
              <div className="flex flex-col md:flex-row justify-between my-4 w-full gap-4">
                <div className="flex-1 flex flex-col">
                  <label htmlFor="" className="font-semibold">
                    Fullname
                  </label>
                  <input
                    name="currency"
                    value={fullname}
                    className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                    onChange={(e) => setCurrency(e.target.value)}
                    disabled
                  />
                </div>
              </div>

              <div className="">
                <label htmlFor="" className="font-semibold">
                  Email
                </label>
                <div className="w-full border border-gray-300 focus:border-gray-300 focus:outline-none focus:ring-0  rounded">
                  <input
                    className="w-full p-2 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                    disabled
                    name="address"
                    value={email}
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between my-4 w-full gap-4">
                <div className="flex-1 flex flex-col">
                  <label htmlFor="" className="font-semibold">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    disabled
                    name="desc"
                    className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                    value={mobileNumber}
                  />
                </div>
              </div>

              <div>
                <p className="text-lg font-semibold">
                  Financial Record for {fullname}
                </p>

                {/* <div className="flex flex-col gap-4">
                  {moneyRecord?.moneyRecord[0]?.moneyrecord.map((record) => (
                    <div
                      className="flex justify-between gap-5 items-center w-full"
                      key={record._id}
                    >
                      <label htmlFor="" className="flex-1">
                        {" "}
                        {record?.currency}
                      </label>
                      <input
                        className="w-full p-2 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900 flex-1"
                        disabled
                        name="address"
                        value={record?.amount}
                      />

                      <button className="p-2 bg-green-600 text-white font-semibold rounded-md">
                        Update
                      </button>
                    </div>
                  ))}
                </div> */}

                {!loading && (
                  <MoneyUpdate
                    //   data={moneyRecord?.moneyRecord[0]}
                    hideForm={hideForm}
                    userEmail={userEmail}
                  />
                )}
              </div>
            </form>
          )}

          <div
            className="absolute top-3 right-3 text-4xl cursor-pointer"
            onClick={hideForm}
          >
            <AiOutlineCloseCircle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBalance;
