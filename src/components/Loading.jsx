import React from "react";
import { BounceLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className=" h-[100vh] w-full flex flex-col items-center justify-center">
      <BounceLoader color="#0D6EFD" size={100} />
    </div>
  );
};

export default Loading;
