"use client";
// import Tabs from "@/components/DashBoardTabs/Tabs";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import React, { useEffect, useState } from "react";
// import MobileMenu from "@/components/DashBoardTabs/MobileMenu";
import { usePathname, useRouter } from "next/navigation";
// import DashBoardPannel from "@/components/DashBoardTabs/DashBoardPannel";
import useRData from "@/hooks/useRData";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/contextAPI/context";
import FullscreenButton from "@/components/FullScreenBtn";
import { RiMenuUnfold3Fill } from "react-icons/ri";
import LogOutBtn from "@/components/LogOutBtn";
// import SuperAdminSideMenu from "@/components/SuperAdminSideMenu";
// import SuperAdminDesktopMenu from "@/components/SuperAdminDesktopMenu";
// import AdjustDesktopMenuWidth from "@/components/AdjustDesktopMenuWidth";
import Loading from "@/components/Loading";
import DesktopMenu from "@/components/DesktopMenu";
import SideMenu from "@/components/SideMenu";
import { IoMenu } from "react-icons/io5";
import { MdOutlineClose } from "react-icons/md";
import ProfilePanel from "@/components/ProfilePanel";
// import ProfilePanel from "@/components/ProfilePanel";

const page = () => {
  const pathname = usePathname();

  const { pageLoading, offPageLoading } = useGlobalContext();

  const { data: session, status } = useSession();

  const router = useRouter();

  // console.log(status);
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth");
    } else if (
      status === "authenticated" &&
      session?.user.email === process.env.NEXT_PUBLIC_MAIL_CHECK
    ) {
      router.push("/manage");
    }
  }, [status, session, router]);

  // console.log(`${status} ${session}`);

  const currentPage = pathname ? pathname.split("/").pop() : "";
  // const { pageLoading, offPageLoading } = useGlobalContext();

  const { data: userData, fetchData, error: err } = useRData();

  // console.log(session);

  const [addPadding, setAddPadding] = useState("10");
  const [leftWidth, setLefttWidth] = useState(15);
  const [changeWidth, setChangeWidth] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [loading, setLoading] = useState(false);

  const activateSideMenu = () => {
    setShowSideMenu((prev) => !prev);
  };

  // const {
  //   data: profileData,
  //   fetchData: validateLogin,
  //   error: err,
  // } = useRData();

  // const validate = () => {
  //   offPageLoading();
  //   validateLogin("//localhost:5000/@me");
  // };

  useEffect(() => {
    if (session?.user?.email) {
      fetchData(`/api/user?email=${session?.user?.email}`);
    }
    // return () => {
    //   setLoading(false);
    // };
  }, [session?.user?.email]);

  // console.log(pageLoading);

  // console.log(userData);

  useEffect(() => {
    if (userData?.user) {
      // setLoading(false);
      offPageLoading();
    }
  }, [userData?.user]);

  useEffect(() => {
    handleWidthChage();
  }, [changeWidth, leftWidth]);

  // if (err.status === 401) {
  //   console.log(err.status);
  //   window.location.href = "/";
  // }

  // useEffect(() => {
  //   if (profileData.status === 200) {
  //     setLoading(false);
  //   }
  // }, [profileData.status]);

  const turnOn = () => {
    setChangeWidth((prev) => !prev);
  };

  const handleWidthChage = () => {
    // localStorage.setItem("changeWidth", changeWidth);
    if (changeWidth) {
      setLefttWidth("3");
      setAddPadding("10");
    }
    if (!changeWidth) {
      setLefttWidth("15");
      setAddPadding("10");
    }
  };

  // console.log(userData.user);

  if (pageLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        {/* <div>
              <BounceLoader className="" size={80} color="#b52624" />
            </div> */}
        <Loading />
      </div>
    );
  }

  return (
    <div className="h-screen w-full relative left-0 flex flex-col items-center">
      <div className="w-full h-max py-4 px-2 md:px-8 bg-blue-600 flex items-center justify-between">
        <p
          className="text-lg md:text-xl font-bold text-white"
          style={{ paddingLeft: `${addPadding}px` }}
        >
          Trade
        </p>

        <div className="flex items-center justify-center gap-2">
          <div className="text-sm md:text-base text-white">
            <p>Hi {userData?.user?.fullname} |</p>
            {/* <p>{userData?.user?.email}</p> */}
          </div>

          {/* <FullscreenButton /> */}

          <LogOutBtn />
        </div>

        {showSideMenu && (
          <SideMenu
            activateSideMenu={activateSideMenu}
            showSideMenu={showSideMenu}
          />
        )}
        <div className=" hideDivMin1025 flex">
          <div
            className="cursor-pointer text-lg h-max p-1 border bg-blue-950  text-white"
            onClick={() => activateSideMenu()}
          >
            {!showSideMenu ? <IoMenu /> : <MdOutlineClose />}
          </div>
        </div>
      </div>
      <div className="w-full h-screen flex items-center font-space_grotesk bg-white ">
        {/* Left Side - Desktop Menu*/}
        <DesktopMenu />

        {/* Right Side */}
        <div className={` w-full h-full`}>
          {/* Wrapper */}
          <div className="w-full h-full">
            <div className="pl-4 w-full h-[85%] md:h-[90%] overflow-y-scroll hideScrollBar">
              <p className="text-xl font-bold hideDivMax1024">
                {/* {currentPage.charAt(0).toUpperCase() +
                    currentPage.slice(1).toLowerCase()} */}
              </p>

              <div className="">
                {/* <ProfilePanel profileData={userData?.user} /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
