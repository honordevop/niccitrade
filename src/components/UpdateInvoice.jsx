"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import useRData from "@/hooks/useRData";
import { GrDocumentUpdate } from "react-icons/gr";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

const UpdateInvoice = ({ hideForm, userEmail, id }) => {
  const {
    data: invoice,
    mutate,
    error,
  } = useSWR(`/api/invoice/${id}`, fetcher);
  //   const { data: invoice, fetchData, error } = useRData();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Initialize states with empty strings or null for when data is not available
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [send, setSend] = useState("");
  const [receive, setReceive] = useState("");
  const [status, setStatus] = useState("");
  const [createdAt, setcreatedAt] = useState("");
  const [bank, setBank] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNum, setAccountNum] = useState("");
  const [address, setAddress] = useState("");

  // Fetch address data when `id` changes
  useEffect(() => {
    if (invoice?.invoice) {
      setLoading(false);
    }
  }, [invoice]);

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      const res = await fetch(`/api/admin/invoice/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        toast("Status Updated");
        setUpdating(false);

        mutate(); // Refresh the data
      } else {
        setUpdating(false);

        // console.error("Error updating record:", await res.text());
        toast.error("Error updating record");
      }
    } catch (error) {
      toast.error("Error during update:", error.message);
    }
  };

  // Update the form fields after data is fetched
  useEffect(() => {
    if (invoice?.invoice) {
      setInvoiceNumber(invoice?.invoice?.invoicenumber);
      setSend(invoice?.invoice?.send);
      setReceive(invoice?.invoice?.receive);
      setStatus(invoice?.invoice?.status);
      setcreatedAt(invoice?.invoice?.createdAt);
      setBank(invoice?.invoice?.bank);
      setAccountName(invoice?.invoice?.accountname);
      setAccountNum(invoice?.invoice?.accountnum);
      setAddress(invoice?.invoice?.address);
    }
  }, [invoice]);

  const handleChange = (event) => {
    setStatus(event.target.value); // Update the state with the new selection
  };

  return (
    <div className="w-full h-screen absolute top-0 left-0 right-0 z-[5] bg-[#00000086]  flex items-center justify-center">
      <div className="w-full pb-8 flex flex-col items-center  h-full bg-yellosw-200">
        <div className="relative bg-white h-max w-5/6 md:w-3/4 lg:w-2/3 xl:w-3/4 mt-12 mx-0 md:mx-auto px-4 md:px-16 rounded-lg shadow-2xl overflow-auto">
          {loading ? (
            <div className="w-full flex items-center my-8 justify-center">
              Loading ...
            </div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row gap-6">
                <form className="mt-14 text-sm flex-1 flex flex-col gap-2">
                  <div className="flex flex-col md:flex-row justify-between w-full gap-4">
                    <div className="flex-1 flex flex-col">
                      <label htmlFor="" className="font-semibold">
                        Invoice Number
                      </label>
                      <input
                        name="currency"
                        value={invoiceNumber}
                        className="mt-1 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                        onChange={(e) => setInvoiceNumber(e.target.value)}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="">
                    <label htmlFor="" className="font-semibold">
                      Send
                    </label>
                    <div className="w-full border border-gray-300 focus:border-gray-300 focus:outline-none focus:ring-0  rounded">
                      <input
                        className="mt-1 w-full p-2 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                        disabled
                        name="address"
                        value={send}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between  w-full gap-4">
                    <div className="flex-1 flex flex-col">
                      <label htmlFor="" className="font-semibold">
                        Receive
                      </label>
                      <input
                        type="text"
                        disabled
                        name="desc"
                        className="mt-1 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                        value={receive}
                      />
                    </div>
                  </div>

                  <div className="">
                    <label htmlFor="" className="font-semibold">
                      Status
                    </label>
                    <div className="w-full border border-gray-300 focus:border-gray-300 focus:outline-none focus:ring-0  rounded flex gap-2 items-center">
                      {!updating ? (
                        <select
                          id="status-select"
                          value={status}
                          onChange={handleChange}
                          className="border rounded px-4 py-2 w-full"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Approved">Approved</option>
                          <option value="Expired">Expired</option>
                        </select>
                      ) : (
                        <p className="border rounded px-4 py-2 w-full">
                          Updating .........
                        </p>
                      )}
                      <GrDocumentUpdate
                        className="text-3xl bg-green-600 text-white cursor-pointer"
                        onClick={() => {
                          handleUpdate();
                        }}
                      />
                    </div>
                  </div>

                  <div className="">
                    <label htmlFor="" className="font-semibold">
                      Created
                    </label>
                    <div className="w-full border border-gray-300 focus:border-gray-300 focus:outline-none focus:ring-0  rounded">
                      <input
                        className="mt-1 w-full p-2 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                        disabled
                        name="address"
                        value={createdAt}
                      />
                    </div>
                  </div>
                </form>
                <div className="flex-1 flex flex-col  justify-center">
                  <h4 className="font-bold">Receiver's Payment Information</h4>

                  {bank.trim() !== "" && accountNum.length > 1 ? (
                    <div className="flex flex-col gap-2">
                      <div className="">
                        <label htmlFor="" className="font-semibold">
                          Bank
                        </label>
                        <div className="w-full border border-gray-300 focus:border-gray-300 focus:outline-none focus:ring-0  rounded">
                          <input
                            className="mt-1 w-full p-2 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                            disabled
                            name="address"
                            value={bank}
                          />
                        </div>
                      </div>

                      <div className="">
                        <label htmlFor="" className="font-semibold">
                          Account Name
                        </label>
                        <div className="w-full border border-gray-300 focus:border-gray-300 focus:outline-none focus:ring-0  rounded">
                          <input
                            className="mt-1 w-full p-2 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                            disabled
                            name="address"
                            value={accountName}
                          />
                        </div>
                      </div>

                      <div className="">
                        <label htmlFor="" className="font-semibold">
                          Account Number
                        </label>
                        <div className="w-full border border-gray-300 focus:border-gray-300 focus:outline-none focus:ring-0  rounded">
                          <input
                            className="mt-1 w-full p-2 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                            disabled
                            name="address"
                            value={accountNum}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="">
                        <label htmlFor="" className="font-semibold">
                          Address
                        </label>
                        <div className="w-full border border-gray-300 focus:border-gray-300 focus:outline-none focus:ring-0  rounded">
                          <input
                            className="mt-1 w-full p-2 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                            disabled
                            name="address"
                            value={address}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full my-4 flex items-center justify-end space-x-4">
                <div className="flex gap-5">
                  <button
                    className="w-full bg-gray-200 hover:bg-gray-50 rounded-lg px-8 py-2 text-black hover:shadow-xl transition duration-150 uppercase font-semibold"
                    onClick={hideForm}
                  >
                    Close
                  </button>
                </div>
              </div>
            </>
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

export default UpdateInvoice;
