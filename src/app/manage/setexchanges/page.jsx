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
import SideMenu from "@/components/SideMenu";
import { IoMenu } from "react-icons/io5";
import { MdOutlineClose } from "react-icons/md";
import ProfilePanel from "@/components/ProfilePanel";
import AdminDesktopMenu from "@/components/AdminDesktopMenu";
import AdminSideMenu from "@/components/AdminSideMenu";
import UsersList from "@/components/UsersList";
import ExchangeForm from "@/components/ExchangeForm";
import { IoMdAddCircle } from "react-icons/io";
import SetExchanges from "@/components/SetExchanges";
// import ProfilePanel from "@/components/ProfilePanel";

const page = () => {
  const pathname = usePathname();

  const { pageLoading, offPageLoading } = useGlobalContext();

  const { data: session, status } = useSession();
  const [showForm, setShowForm] = useState();

  const router = useRouter();

  // console.log(session);
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth");
    } else if (
      status === "authenticated" &&
      session?.user.email !== process.env.NEXT_PUBLIC_MAIL_CHECK
    ) {
      router.push("/auth");
    }
  }, [status, session]);

  // console.log(`${status} ${session}`);

  const currentPage = pathname ? pathname.split("/").pop() : "";
  // const { pageLoading, offPageLoading } = useGlobalContext();

  const { data: users, fetchData, error: err } = useRData();
  const { data: userData, fetchData: fetchAdminData, error: erro } = useRData();

  // console.log(session);

  const [addPadding, setAddPadding] = useState("10");
  const [leftWidth, setLefttWidth] = useState(15);
  const [changeWidth, setChangeWidth] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [loading, setLoading] = useState(false);

  const activateSideMenu = () => {
    setShowSideMenu((prev) => !prev);
  };

  const handleShowForm = () => {
    setShowForm((prev) => !prev);
  };

  const hideForm = () => {
    setShowForm(false);
  };

  useEffect(() => {
    if (session?.user?.email) {
      fetchData(`/api/admin/users?email=${session?.user?.email}`);
    }
    // return () => {
    //   setLoading(false);
    // };
  }, [session?.user?.email]);

  useEffect(() => {
    if (session?.user?.email) {
      fetchAdminData(`/api/user?email=${session?.user?.email}`);
    }
    // return () => {
    //   setLoading(false);
    // };
  }, [session?.user?.email]);

  // console.log(pageLoading);

  // console.log(users);

  useEffect(() => {
    if (users?.users) {
      // setLoading(false);
      offPageLoading();
    }
  }, [users?.users]);

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

  if (
    status === "authenticated" &&
    session?.user?.email === process.env.NEXT_PUBLIC_MAIL_CHECK
  ) {
    return (
      <div className="h-screen w-full relative left-0 flex flex-col items-center">
        <div className="w-full h-max py-4 px-2 md:px-8 bg-blue-600 flex items-center justify-between">
          <p
            className="text-lg md:text-xl font-bold text-white"
            style={{ paddingLeft: `${addPadding}px` }}
          >
            Administrator
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
            <AdminSideMenu
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
          <AdminDesktopMenu />

          {/* Right Side */}
          <div className={` w-full h-full`}>
            {/* Wrapper */}
            <div className="w-full h-full">
              <div className="pl-4 w-full  overflow-y-scroll hideScrollBar">
                <p className="text-xl font-bold my-4">List of Exchanges</p>

                <p
                  className="w-max flex items-center gap-2 text-blue-500 cursor-pointer"
                  onClick={() => {
                    handleShowForm();
                  }}
                >
                  <IoMdAddCircle className="text-lg my-4" />
                  Add Exchange
                </p>
                <div className="">
                  {showForm && (
                    <ExchangeForm users={users?.users} hideForm={hideForm} />
                  )}
                </div>
                <div>
                  <SetExchanges />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default page;
