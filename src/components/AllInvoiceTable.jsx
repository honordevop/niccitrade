"use client";
import React, { useState } from "react";
import { LuNotebook } from "react-icons/lu";
import { MdAutoDelete, MdOutlineEditCalendar } from "react-icons/md";
import ViewAddress from "./ViewAddress";
import EditAddress from "./EditAddress";
import { FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
import ViewInvoice from "./ViewInvoice";
import UpdateInvoice from "./UpdateInvoice";

const AllInvoiceTable = ({ invoiceList, mutate }) => {
  const [id, setId] = useState("");
  const [viewInvoice, setViewInvoice] = useState(false);
  const [viewEditAddress, setViewEditAddress] = useState(false);

  const handleViewInvoice = (id) => {
    setId(id);
    // console.log(id);
    setViewInvoice((prev) => !prev);
  };

  const hideViewInvoice = () => {
    setViewInvoice(false);
  };

  const handleViewEditAddress = (id) => {
    setId(id);
    // console.log(id);
    setViewEditAddress((prev) => !prev);
  };

  const hideViewEditAddress = () => {
    setViewEditAddress(false);
  };

  const handleDelete = async (id) => {
    // setDeleting(true);
    const userConfirmed = confirm("Are you sure you want to Address?");

    if (!userConfirmed) {
      // setDeleting(false);
      return;
    }

    try {
      const response = await fetch(`/api/invoice/${id}`, {
        method: "DELETE",
      });

      const res = await response.json();
      mutate();
      toast(res?.message);

      // setTimeout(() => {
      //   setDeleting(false);
      // }, 1500);
    } catch (error) {
      // setError(error?.response);
      // setDeleting(false);
      toast(error?.message);
      // console.log(error?.response);
    }
  };

  const icons = [
    { icon: <MdAutoDelete className="text-red-600" />, handler: handleDelete },
    { icon: <FaEye className="text-green-700" />, handler: handleViewInvoice },
    // { icon: <MdOutlineEditCalendar />, handler: handleViewEditAddress },
  ];

  const renderIcon = (Icon, iconIndex, invc) => (
    <td
      key={iconIndex}
      className="px-6 border py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
      onClick={() => Icon.handler(invc._id)}
    >
      {Icon.icon}
    </td>
  );

  const renderRow = (invc, i) => (
    <tr key={invc._id} className="border-1 border-gray-400 bg-gray-100">
      {icons.map((Icon, iconIndex) => renderIcon(Icon, iconIndex, invc))}
      <td className="px-6 border py-2 whitespace-nowrap">
        {invc?.invoicenumber}
      </td>
      <td className="px-6 border py-2 whitespace-nowrap">{invc?.send}</td>
      <td className="px-6 border py-2 whitespace-nowrap">{invc?.receive}</td>
      <td
        className="px-6 border py-2 whitespace-nowrap"
        title={
          invc?.status === "Expired"
            ? "Expired"
            : invc?.status === "Approved"
            ? "Approved"
            : "Pending"
        }
      >
        <span
          className={`px-2 rounded-sm text-white ${
            invc?.status === "Expired"
              ? "bg-red-600"
              : invc?.status === "Approved"
              ? "bg-green-800"
              : "bg-blue-600"
          }`}
        >
          {invc?.status === "Expired"
            ? "E"
            : invc?.status === "Approved"
            ? "A"
            : "P"}
        </span>
      </td>

      <td className="px-6 border py-2 whitespace-nowrap">{invc?.status}</td>
      <td className="px-6 border py-2 whitespace-nowrap">
        {invc?.createdAt.slice(0, 10)}
      </td>
    </tr>
  );

  return (
    <div className="w-full flex items-center md:px-5 my-10">
      <table className="container divide-y divide-gray-200 border">
        <thead>
          <tr>
            <th className="px-6 border py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            <th className="px-6 border py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            {/* <th className="px-6 border py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th> */}

            <th className="px-6 border py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Number
            </th>
            <th className="px-6 border py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Send
            </th>
            <th className="px-6 border py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Receive
            </th>
            <th className="px-6 border py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Expired
            </th>
            <th className="px-6 border py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 border py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created
            </th>
          </tr>
        </thead>
        <tbody className="h-max">{invoiceList?.map(renderRow)}</tbody>
      </table>
      {viewInvoice && <UpdateInvoice id={id} hideForm={hideViewInvoice} />}
      {/* {viewEditAddress && (
        <EditAddress id={id} hideForm={hideViewEditAddress} mutate={mutate} />
      )} */}
    </div>
  );
};

export default AllInvoiceTable;
