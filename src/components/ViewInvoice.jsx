"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import useRData from "@/hooks/useRData";

const ViewInvoice = ({ hideForm, userEmail, id }) => {
  const { data: invoice, fetchData, error } = useRData();
  const [loading, setLoading] = useState(true);

  // Initialize states with empty strings or null for when data is not available
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [send, setSend] = useState("");
  const [receive, setReceive] = useState("");
  const [status, setStatus] = useState("");
  const [createdAt, setcreatedAt] = useState("");

  // Fetch address data when `id` changes
  useEffect(() => {
    setLoading(true); // Set loading to true before fetching data
    const fetchAddress = async () => {
      try {
        await fetchData(`/api/invoice/${id}`);
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        setLoading(false); // Set loading to false even if an error occurs
        toast.error("Failed to load address");
      }
    };

    fetchAddress();
  }, [id]);

  // Update the form fields after data is fetched
  useEffect(() => {
    if (invoice?.invoice) {
      setInvoiceNumber(invoice?.invoice?.invoicenumber);
      setSend(invoice?.invoice?.send);
      setReceive(invoice?.invoice?.receive);
      setStatus(invoice?.invoice?.status);
      setcreatedAt(invoice?.invoice?.createdAt);
    }
  }, [invoice]);

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
              <div className="flex flex-col md:flex-row gap-4">
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
                    <div className="w-full border border-gray-300 focus:border-gray-300 focus:outline-none focus:ring-0  rounded">
                      <input
                        className="mt-1 w-full p-2 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                        disabled
                        name="address"
                        value={status}
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
                <div className="flex-1 flex flex-col items-center justify-center">
                  <h4 className="font-bold">
                    Make Payment using the info below
                  </h4>
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

export default ViewInvoice;
