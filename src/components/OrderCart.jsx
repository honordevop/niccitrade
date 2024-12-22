"use client";
import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaArrowRightToBracket, FaRegPaperPlane } from "react-icons/fa6";
import { IoArrowForwardCircleSharp } from "react-icons/io5";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

function generateRandomCode() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}
const OrderCart = ({ hideForm, order, userEmail }) => {
  //   console.log(userEmail);
  const [loading, setLoading] = useState(false);
  const [invoiceSuccess, setInvoiceSuccess] = useState(false);
  const [inputs, setInputs] = useState({
    address: "",
    bank: "",
    accountname: "",
    accountnum: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const formIsValid = (value) => value.trim() !== "";

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const invoicenumber = generateRandomCode();
    const addressIsValid = formIsValid(inputs?.address);
    const bankIsValid = formIsValid(inputs?.bank);
    const accountNameIsValid = formIsValid(inputs?.accountname);
    const accountNumIsValid = formIsValid(inputs?.accountnum);
    const invoiceNumberIsValid = formIsValid(invoicenumber);

    // console.log(
    //   `${addressIsValid} - ${bankIsValid} - ${accountNameIsValid} - ${accountNumIsValid}`
    //   );

    if (
      (addressIsValid && invoiceNumberIsValid) ||
      (bankIsValid &&
        accountNameIsValid &&
        accountNumIsValid &&
        invoiceNumberIsValid)
    ) {
      // console.log(inputs);

      try {
        const res = await fetch(`/api/invoice`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            send: `${order?.sendCurrency} ${order?.send}`,
            receive: `${order?.receiveCurrency} ${order?.receive}`,
            invoicenumber,
            email: userEmail,
          }),
        });

        // mutate();
        const data = await res.json();
        //   console.log(data);
        toast(data?.message);
        setLoading(false);
        setInvoiceSuccess(true);
        //   router.push(`/product/${data.id}`);
      } catch (error) {
        // console.log(error);
        setLoading(false);
        toast.warn(error?.message);
      }
      //   console.log(inputs);
    }

    setLoading(false);
  };

  return (
    <div className="w-full h-screen absolute top-0 left-0 right-0 z-[5] bg-[#00000086]  flex items-center justify-center">
      <div className="w-full pb-8 flex flex-col items-center  h-full bg-yellosw-200">
        <div className="relative bg-white h-max w-5/6 md:w-3/4 lg:w-2/3 xl:w-3/4 mt-12 mx-0 md:mx-auto px-4 md:px-16 rounded-lg shadow-2xl overflow-auto">
          <div>
            <p className="my-5 font-bold text-lg">Order </p>
            <p>Order confirmation</p>
          </div>

          <div className="mt-5 text-sm flex flex-col gap-5">
            <table className="container divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-1 md:px-6 border py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Send
                  </th>
                  <th className="px-1 md:px-6 border py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fees
                  </th>
                  <th className="px-1 md:px-6 border py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Receive
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-1 border-gray-400 bg-blue-100">
                  <td className="px-1 md:px-6 border py-2 whitespace-nowrap">{`${order?.sendCurrency} ${order?.send}`}</td>
                  <td className="px-1 md:px-6 border py-2 whitespace-nowrap">
                    BTC (USD)
                  </td>
                  <td className="px-1 md:px-6 border py-2 whitespace-nowrap">
                    {`${order?.receiveCurrency} ${order?.receive}`}
                  </td>
                </tr>
              </tbody>
            </table>

            {!invoiceSuccess ? (
              <form action="" onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row8 justify-between my-4 w-full gap-5">
                  <p className="flex gap-5 items-center">
                    <FaArrowRightToBracket className="text-xl" />
                    Receive {order?.receiveCurrency} in this{" "}
                    {order?.receiveCurrency !== "NGN"
                      ? "Wallet Address"
                      : "Bank"}
                  </p>
                  <div className="flex-1 flex flex-col gap-4">
                    {order?.receiveCurrency !== "NGN" ? (
                      <input
                        type="text"
                        placeholder="* Wallet Address"
                        name="address"
                        onChange={handleChange}
                        className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                      />
                    ) : (
                      <>
                        <input
                          type="text"
                          placeholder="* Bank"
                          name="bank"
                          onChange={handleChange}
                          className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                        />

                        <input
                          type="text"
                          placeholder="* Account Name"
                          name="accountname"
                          onChange={handleChange}
                          className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                        />

                        <input
                          type="number"
                          placeholder="* Account Number"
                          name="accountnum"
                          onChange={handleChange}
                          className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                        />
                      </>
                    )}
                  </div>

                  <div className="flex gap-4 items-center my-2 ">
                    {" "}
                    <IoArrowForwardCircleSharp className="text-xl" />
                    The payment info to send the {order?.sendCurrency} would be
                    provided on the invoice page.
                  </div>
                </div>

                <div className="w-full my-4 flex items-center justify-end space-x-4">
                  {!loading && (
                    <div className="flex gap-5">
                      <button
                        className="w-max  bg-gray-200 hover:bg-gray-50 rounded-lg px-8 py-2 text-black transition duration-150 uppercase font-semibold"
                        onClick={hideForm}
                      >
                        Close
                      </button>
                      <button
                        className="w-max  bg-blue-600 hover:bg-blue-200 rounded-lg px-8 py-2 text-gray-100 hover:text-black hover:shadow-xl transition duration-150 uppercase font-semibold"
                        // onClick={() => createEvent()}
                      >
                        Place Order
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
            ) : (
              <div className="w-full leadin my-5 font-bold flex items-center gap-5">
                {" "}
                <FaRegPaperPlane className="text-lg text-blue-600" />
                Your Order has been placed Succesfully. Go to Invoice page to
                get payment Information.
              </div>
            )}
          </div>

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

export default OrderCart;
