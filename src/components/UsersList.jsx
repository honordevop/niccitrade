"use client";
import React, { useState } from "react";
import { FaEye } from "react-icons/fa6";
import ViewBalance from "./ViewBalance";
import { MdAutoDelete } from "react-icons/md";
import { toast } from "react-toastify";

const UsersList = ({ users }) => {
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [viewBalace, setViewBalace] = useState(false);

  const handleViewBalance = (email, id) => {
    setEmail(email);
    // console.log(id);
    setViewBalace((prev) => !prev);
  };

  const hideViewBalance = () => {
    setViewBalace(false);
  };

  const handleDelete = async (email, id) => {
    // setDeleting(true);
    const userConfirmed = confirm("Are you sure you want to Delete?");

    if (!userConfirmed) {
      // setDeleting(false);
      return;
    }

    try {
      const response = await fetch(`/api/admin/users/${id}`, {
        method: "DELETE",
      });

      const res = await response.json();
      // mutate();
      toast(res?.message);

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      // setError(error?.response);
      // setDeleting(false);
      toast(error?.message);
      // console.log(error?.response);
    }
  };

  const icons = [
    { icon: <MdAutoDelete className="text-red-600" />, handler: handleDelete },
    { icon: <FaEye className="text-green-700" />, handler: handleViewBalance },
  ];

  const renderIcon = (Icon, iconIndex, user) => (
    <td
      key={iconIndex}
      className="px-6 border py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
      onClick={() => Icon.handler(user.email, user._id)}
    >
      {Icon.icon}
    </td>
  );
  const renderRow = (user, i) => (
    <tr key={user._id} className="border-1 border-gray-400 odd:bg-gray-100">
      {icons.map((Icon, iconIndex) => renderIcon(Icon, iconIndex, user))}
      <td className="px-6 border py-2 whitespace-nowrap">{user.fullname}</td>
      <td className="px-6 border py-2 whitespace-nowrap">{user.email}</td>
      <td className="px-6 border py-2 whitespace-nowrap">
        {user.mobilenumber}
      </td>
      <td className="px-6 border py-2 whitespace-nowrap">
        {user.createdAt.slice(0, 10)}
      </td>
    </tr>
  );

  return (
    <div>
      {/* <p className="font-bold text-lg my-4">All Registered users</p> */}

      <div className="flex flex-col mt-4">
        <div className="flex gap-4 flex-wrap">
          {/* <div className="rounded-sm p-2 border">{user.fullname}</div>
            <div className="rounded-sm p-2 border">{user.email}</div> */}

          <table className="container divide-y divide-gray-200 border">
            <thead>
              <tr>
                {/* <th className="px-6 border py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  <th className="px-6 border py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>*/}
                <th className="px-6 border py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                <th className="px-6 border py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 border py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 border py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mobile
                </th>
                <th className="px-6 border py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registered
                </th>
              </tr>
            </thead>
            <tbody className="h-max">{users?.map(renderRow)}</tbody>
          </table>
        </div>

        {viewBalace && (
          <ViewBalance
            userEmailAddress={email}
            id={id}
            hideForm={hideViewBalance}
          />
        )}
      </div>
    </div>
  );
};

export default UsersList;
