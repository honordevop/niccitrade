"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

const ProfilePanel = ({ profileData }) => {
  const [error, setError] = useState();

  const [password, setPassword] = useState("");

  // console.log(profileData?.profileimg);
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const formIsValid = (value) => value.trim() !== "";

  const submitNewPassword = async () => {
    const passwordCheck = formIsValid(password);
    if (!passwordCheck) {
      return;
    }

    try {
      const res = await fetch("/api/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          email: profileData?.email,
        }),
      });
      const data = await res.json();

      //   console.log(data);
      setPassword("");
      toast(data.message);
    } catch (error) {
      // console.log(error);
      // setLoading(false);
      toast.warn(error.message);
    }
  };

  return (
    <div className="max-w-[350px] md:max-w-[400px]">
      <div className="my-8 text-sm">
        <div className="">
          {profileData?.image && (
            <Image
              alt="profile image"
              src={profileData?.image}
              height={150}
              width={150}
              className="rounded-[50%]"
            />
          )}
        </div>
        <div className="flex flex-col my-4">
          <label htmlFor="" className="font-bold">
            Fullname
          </label>
          <input
            type="text"
            className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900 cursor-pointer"
            placeholder="Enter your Fullname"
            readOnly
            value={profileData?.fullname}
          ></input>
        </div>

        <div className="flex flex-col my-4">
          <label htmlFor="" className="font-bold">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900 cursor-pointer"
            placeholder="Email Address"
            readOnly
            value={profileData?.email}
          />
        </div>

        <div className="flex flex-col my-4">
          <label htmlFor="" className="font-bold">
            New Password
          </label>
          <input
            type="password"
            required
            name="password"
            id="password"
            className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
            placeholder="Enter New Password"
            onChange={passwordChangeHandler}
            value={password}
          />
        </div>

        <div className="flex flex-col my-4">
          <label htmlFor="" className="font-bold">
            Registration Date
          </label>
          <input
            className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900 cursor-pointer"
            readOnly
            value={profileData?.createdAt}
          ></input>
        </div>

        <div className="flex flex-col my-4">
          <label htmlFor="" className="font-bold">
            Mobile Number
          </label>
          <input
            className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900 cursor-pointer"
            readOnly
            value={profileData?.mobilenumber}
          ></input>
        </div>

        <div
          className="w-full bg-blue-600 hover:bg-blue-200 rounded-lg px-8 py-2 text-gray-100 hover:text-black hover:shadow-xl transition duration-150 uppercase font-semibold cursor-pointer text-center"
          onClick={() => {
            submitNewPassword();
          }}
        >
          Update
        </div>
      </div>
    </div>
  );
};

export default ProfilePanel;
