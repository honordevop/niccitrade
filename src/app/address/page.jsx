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
import { IoMdAddCircle } from "react-icons/io";
import AddressForm from "@/components/AddressForm";
import AddressTable from "@/components/AddreessTable";
import useSWR from "swr";
// import ProfilePanel from "@/components/ProfilePanel";

const fetcher = (url) => fetch(url).then((r) => r.json());
const page = () => {
  const pathname = usePathname();

  const { pageLoading, offPageLoading } = useGlobalContext();

  const { data: session, status } = useSession();

  const [showNewForm, setShowNewForm] = useState(false);

  const router = useRouter();

  console.log(status);
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

  const hideNewAddressFormHandler = () => {
    setShowNewForm(false);
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

  const {
    data: addresses,
    mutate,
    error,
  } = useSWR(`/api/address?email=${session?.user?.email}`, fetcher);
  const sortedData = addresses?.addresses?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // console.log(pageLoading);

  // console.log(addresses?.addresses);

  useEffect(() => {
    if (userData?.user) {
      // setLoading(false);
      offPageLoading();
    }
  }, [userData?.user]);

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

  const showNewAddressForm = () => {
    setShowNewForm((prev) => !prev);
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
    <div className="w-full h-max relative left-0 flex flex-col items-center overflow-y-scroll">
      <div className="w-full h-full py-4 px-2 md:px-8 bg-blue-600 flex items-center justify-between">
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
            <div className="pl-4 mt-4 h-[70%] md:h-[80%] overflow-y-scroll hideScrollBar">
              <p
                className=" flex items-center gap-2 text-blue-500 cursor-pointer"
                onClick={() => {
                  showNewAddressForm();
                }}
              >
                <IoMdAddCircle className="text-lg" />
                Add Address
              </p>

              <div className="">
                {showNewForm && (
                  <AddressForm
                    hideForm={hideNewAddressFormHandler}
                    userEmail={session?.user?.email}
                    mutate={mutate}
                  />
                )}
                {/* <ProfilePanel profileData={userData?.user} /> */}
              </div>

              <div className="overflow-x-scroll h-[90vh]">
                <AddressTable
                  addressList={addresses?.addresses}
                  mutate={mutate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
