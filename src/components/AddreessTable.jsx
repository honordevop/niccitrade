"use client";
import React, { useState } from "react";
import { LuNotebook } from "react-icons/lu";
import { MdAutoDelete, MdOutlineEditCalendar } from "react-icons/md";
import ViewAddress from "./ViewAddress";
import EditAddress from "./EditAddress";
import { FaEye } from "react-icons/fa";
import { toast } from "react-toastify";

const AddressTable = ({ addressList, mutate }) => {
  const [id, setId] = useState("");
  const [viewAddress, setViewAddress] = useState(false);
  const [viewEditAddress, setViewEditAddress] = useState(false);

  const handleViewAddress = (id) => {
    setId(id);
    // console.log(id);
    setViewAddress((prev) => !prev);
  };

  const hideViewAddress = () => {
    setViewAddress(false);
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
      const response = await fetch(`/api/address/${id}`, {
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
    { icon: <MdAutoDelete />, handler: handleDelete },
    { icon: <FaEye />, handler: handleViewAddress },
    { icon: <MdOutlineEditCalendar />, handler: handleViewEditAddress },
  ];

  const renderIcon = (Icon, iconIndex, addr) => (
    <td
      key={iconIndex}
      className="px-6 border py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
      onClick={() => Icon.handler(addr._id)}
    >
      {Icon.icon}
    </td>
  );

  const renderRow = (addr, i) => (
    <tr key={addr._id} className="border-1 border-gray-400 bg-gray-100">
      {icons.map((Icon, iconIndex) => renderIcon(Icon, iconIndex, addr))}
      <td className="px-6 border py-2 whitespace-nowrap">{addr.currency}</td>
      <td className="px-6 border py-2 whitespace-nowrap">{addr.address}</td>
      <td className="px-6 border py-2 whitespace-nowrap">{addr.desc}</td>
    </tr>
  );

  return (
    <div className="w-full flex items-center md:px-5 my-10">
      <table className="container divide-y divide-gray-200 border">
        <thead>
          <tr>
            <th className="px-6 border py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            <th className="px-6 border py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            <th className="px-6 border py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            <th className="px-6 border py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Currency
            </th>
            <th className="px-6 border py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Address
            </th>
            <th className="px-6 border py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="h-max">{addressList?.map(renderRow)}</tbody>
      </table>
      {viewAddress && <ViewAddress id={id} hideForm={hideViewAddress} />}
      {viewEditAddress && (
        <EditAddress id={id} hideForm={hideViewEditAddress} mutate={mutate} />
      )}
    </div>
  );
};

export default AddressTable;
