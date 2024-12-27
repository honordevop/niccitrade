"use client";
import { useSession } from "next-auth/react";
// import { exchange } from "@/Utils/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoArrowForward, IoArrowForwardCircleSharp } from "react-icons/io5";
import useSWR from "swr";

const exchange = [
  {
    NGN: ["BTC(USD)", "USDT-TRC20", "TRON"],
  },
  {
    "BTC(USD)": ["NGN"],
  },
  {
    "USDT-TRC20": ["NGN"],
  },
  {
    "USDT-ERC20-BC": ["NGN"],
  },
  {
    PM: ["NGN", "BTC(USD)"],
  },
];

// const baseline = [
//   { name: "BTC(USD)", value: 98514.59 },
//   { name: "USDT-TRC20", value: 1.0 },
//   { name: "USDT-ERC20-BC", value: 1.0 },
//   { name: "TRON", value: 0.23 },
//   { name: "NGN", value: 0.00065 },
// ];

// const baseline = [
//   { name: "BTC(USD)", value: 1622.0 },
//   { name: "USDT-TRC20", value: 1625.0 },
//   { name: "USDT-ERC20-BC", value: 1550.0 },
//   { name: "TRON", value: 0.23 },
//   { name: "NGN", value: 0.00065 },
// ];
const fetcher = (url) => fetch(url).then((r) => r.json());

const Calculator = ({ showOrder, getOrderdetails }) => {
  const [selectedKey, setSelectedKey] = useState("NGN");
  const [options, setOptions] = useState(exchange[0].NGN);
  const [selectedName, setSelectedName] = useState(options[0]);
  const [receive, setReceive] = useState("");
  const [sendValue, setSendValue] = useState(1000);
  const [fee, setFee] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [baseline, setBaseline] = useState([]);

  const session = useSession();

  const { data, mutate, error } = useSWR(`/api/admin/exchanges`, fetcher);

  useEffect(() => {
    if (data?.exchanges) {
      // setExchangeRecords(data.exchanges);
      setBaseline([
        {
          name: data?.exchanges[0]?.exchange,
          value: parseFloat(data?.exchanges[0]?.amount),
        },
        {
          name: data?.exchanges[1]?.exchange,
          value: parseFloat(data?.exchanges[1]?.amount),
        },
        {
          name: data?.exchanges[2]?.exchange,
          value: parseFloat(data?.exchanges[2]?.amount),
        },
        {
          name: data?.exchanges[3]?.exchange,
          value: parseFloat(data?.exchanges[3]?.amount),
        },
        {
          name: data?.exchanges[4]?.exchange,
          value: parseFloat(data?.exchanges[4]?.amount),
        },
      ]);
    }
  }, [data]);

  useEffect(() => {
    const percentageFee = sendValue * (2 / 100);

    setFee(percentageFee);
  }, [sendValue]);

  // console.log(fee);

  useEffect(() => {
    const selectedItem = exchange.find((item) => item[selectedKey]);
    setOptions(selectedItem ? selectedItem[selectedKey] : []);
    setSelectedName(selectedItem ? selectedItem[selectedKey][0] : ""); // Update default selected option
  }, [selectedKey]);

  useEffect(() => {
    let result = 0;

    if (
      selectedKey === "NGN" &&
      ["BTC(USD)", "USDT-TRC20", "TRON"].includes(selectedName)
    ) {
      // Case: NGN to BTC(USD), USDT-TRC20, TRON
      const baselineOption = baseline.find(
        (item) => item.name === selectedName
      );
      if (baselineOption) {
        const sendValueInNGN =
          sendValue / parseFloat(data?.exchanges[5]?.amount);
        result = sendValueInNGN / baselineOption.value;
      }
    } else if (
      ["BTC(USD)", "USDT-TRC20", "TRON", "USDT-ERC20-BC"].includes(
        selectedKey
      ) &&
      selectedName === "NGN"
    ) {
      // Case: BTC(USD), USDT-TRC20, TRON to NGN
      const baselineOption = baseline.find((item) => item.name === selectedKey);
      if (baselineOption) {
        const sendValueInNGN = sendValue * baselineOption.value;
        result = sendValueInNGN * parseFloat(data?.exchanges[5]?.amount);
      }
    }

    if (result) {
      setReceive(result.toFixed(2));
    } else {
      setReceive("");
    }
  }, [sendValue, selectedName, selectedKey]);

  const handleKeyChange = (e) => {
    setSelectedKey(e.target.value);
  };

  const handleNameChange = (e) => {
    setSelectedName(e.target.value);
  };

  const handleOrder = () => {
    // console.log(
    //   `Send us ${sendValue} ${selectedKey} and Receive ${receive} ${selectedName}`
    // );
    getOrderdetails(sendValue, selectedKey, receive, selectedName);
    showOrder();
  };

  // Handler function to update the state
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <div className="w-full flex flex-col gap-7">
      <div className="flex gap-5 md:gap-10 items-center justify-center">
        <div className="">Send Us</div>
        <div className="flex gap-3 items-center justify-center">
          <input
            type="text"
            value={sendValue}
            onChange={(e) => setSendValue(e.target.value)}
            className="outline-none p-2 rounded-md border w-[100px] md:w-[160px]"
          />
          <select
            className="w-[120px] md:w-[160px] outline-none p-2 rounded-md cursor-pointer border"
            value={selectedKey}
            onChange={handleKeyChange}
          >
            {exchange.map((item) => {
              const key = Object.keys(item)[0];
              return (
                <option key={key} value={key}>
                  {key}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className="flex gap-5 md:gap-10 items-center justify-center">
        <div className="">Receive</div>
        <div className="flex gap-3 items-center justify-center">
          <input
            type="text"
            value={receive}
            readOnly
            className="outline-none p-2 rounded-md border w-[100px] md:w-[160px] bg-white h-10"
          />
          <select
            value={selectedName}
            onChange={handleNameChange}
            className="w-[120px] md:w-[160px] outline-none p-2 rounded-md cursor-pointer border"
          >
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-justify">
        I consent to the application rates displayed above and other related
        fees that could be presented on the next page where the details for this
        order would be provided and securely processed for execution.
      </p>

      <>
        {session.status === "authenticated" ? (
          <div className="flex items-center justify-between">
            <div className="flex gap-5 items-center">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />{" "}
              I accept the terms of service
            </div>

            <button
              style={{
                backgroundColor: isChecked ? "blue" : "grey",
                cursor: isChecked ? "pointer" : "not-allowed",
              }}
              onClick={() => {
                handleOrder();
              }}
              disabled={!isChecked}
              className="px-2 py-1 bg-blue-600 rounded-sm flex gap-2 items-center text-white"
            >
              <IoArrowForward />
              Order
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <p className="flex gap-2 items-center">
              <IoArrowForwardCircleSharp />
              Login required to place orders
            </p>
            <Link
              href="/auth"
              className="px-2 py-1 bg-blue-600 rounded-sm flex gap-2 items-center cursor-pointer text-white"
            >
              <IoArrowForward />
              Login
            </Link>
          </div>
        )}
      </>
    </div>
  );
};

export default Calculator;
