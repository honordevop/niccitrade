"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

const ProfilePanel = ({ profileData }) => {
  //   console.log(profileData);
  // const [loading, setLoading] = useState(false);
  // const [data, setData] = useState(profileData);
  // console.log(data);
  const [file, setFile] = useState();
  const [error, setError] = useState();

  const handleChangeImg = (e) => {
    const target = e.target;
    // console.log(target);
    const item = target.files[0];
    setFile(item);
  };

  const upload = async () => {
    // console.log(file);
    if (file === undefined) {
      setError("No file chosen");
      setTimeout(() => {
        setError("");
      }, 1500);
      return;
    }

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "igtapreset");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/ornor/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      if (!res.ok) {
        throw new Error("Failed to upload image");
      }

      const resData = await res.json();
      // console.log(resData.secure_url);
      return resData.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    // setLoading(true);

    e.preventDefault();

    try {
      const url = await upload();
      if (url) {
        const res = await fetch("/api/uploadprofilepic", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: url,
            email: profileData?.email,
          }),
        });
        const data = await res.json();
      }
      //   console.log(data);
      toast(data.message);
    } catch (error) {
      // console.log(error);
      // setLoading(false);
      toast.warn(error.message);
    }
  };

  return (
    <div>
      <div className="my-8 text-sm">
        <form action="" onSubmit={handleSubmit}>
          <div className="relative">
            {profileData?.image && (
              <Image
                alt="profile image"
                src={profileData?.image}
                height={150}
                width={150}
                className="rounded-[50%]"
              />
            )}
            <label htmlFor="file" className="absolute top-[70px] left-[25px]">
              <Image
                src="/upload.png"
                height={100}
                width={100}
                alt="upload"
                className=" rounded-[50%] z-0"
              />
            </label>
            <input
              id="file"
              type="file"
              onChange={handleChangeImg}
              className=" p-auto hidden"
            />
          </div>

          <div className="ml-4 flex flex-col items-center gap-2 w-max">
            <p className="font-semibold text-red-500">{error}</p>

            <button
              className="w-max  primaryBgColor hover:primaryBgColorLight rounded-lg px-8 py-2 text-gray-100 hover:shadow-xl transition duration-150 uppercase font-semibold"
              // onClick={() => createEvent()}
            >
              Upload
            </button>
          </div>
        </form>
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
            Gender
          </label>
          <input
            className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900 cursor-pointer"
            readOnly
            value={profileData?.gender}
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

        <div className="">
          <label htmlFor="" className="font-bold">
            Occupation
          </label>
          <div className="w-full flex flex-row border border-gray-300 focus:border-gray-300 focus:outline-none focus:ring-0  rounded">
            <input
              type="text"
              className="w-[70%] p-2  focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900 cursor-pointer"
              readOnly
              value={profileData?.occupation}
            ></input>
          </div>
        </div>

        <div className="flex flex-col my-4">
          <label htmlFor="" className="font-bold">
            Designation
          </label>
          <input
            type="text"
            className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900 cursor-pointer"
            readOnly
            value={profileData?.designation}
          ></input>
        </div>

        <div className="flex flex-col my-4">
          <label htmlFor="" className="font-bold">
            Country
          </label>
          <input
            className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900 cursor-pointer"
            readOnly
            value={profileData?.country}
          ></input>
        </div>

        <div className="flex flex-col my-4">
          <label htmlFor="" className="font-bold">
            Registered On
          </label>
          <input
            className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900 cursor-pointer"
            readOnly
            value={profileData?.createdAt}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default ProfilePanel;
