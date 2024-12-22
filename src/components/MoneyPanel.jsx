import Link from "next/link";
import React from "react";
import { FaRegClock } from "react-icons/fa6";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

const MoneyPanel = ({ profileData }) => {
  const {
    data: moneyRecord,
    mutate,
    error,
  } = useSWR(`/api/money?email=${profileData?.email}`, fetcher);

  // console.log(moneyRecord?.moneyRecord[0]?.moneyrecord);
  const money = moneyRecord?.moneyRecord[0]?.moneyrecord;
  return (
    <div className="mt-5 flex gap-5 flex-wrap">
      {money?.map((mon, i) => (
        <div
          className="w-[250px] border rounded-sm  p-2 border-l-4 border-l-blue-600"
          key={i}
        >
          <div className="w-full font-bold text-right">{mon?.currency}</div>

          <div className="w-full">
            <p className="font-black">{mon?.amount}</p>
            <div className="flex items-center gap-4 text-[14px]">
              <p>Total available</p>
              <Link href="/payment">
                <FaRegClock className="text-blue-600" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MoneyPanel;
