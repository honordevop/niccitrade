import { BsCartCheck, BsCartCheckFill } from "react-icons/bs";
import { FaFileInvoiceDollar, FaRegUser } from "react-icons/fa6";
import { CiMoneyBill } from "react-icons/ci";
import { MdOutlineLocationOn } from "react-icons/md";


export const exchange =[
  {
    "NGN": [ {name: "BTC(USD)", value: 92527.18}, {name: "USDT-TRC20", value: 1.00}, {name: "TRON", value: 0.23}
    ],
  },
  {
    "BTC (USD)": [ {name: "NGN", value: 1556.44}
    ],
  },
  {
    "USDT-TRC20": [ {name: "NGN", value: 1530}
    ],
  },
  {
    "USDT-TRC20 BC": [ {name: "NGN", value: 1550}
    ],
  },
  {
    "PM": [ {name: "NGN", value: 1000}, {name: "BTC (USD)", value: 0.9}
    ],
  }
]

export const UserTabsLink = [
  {
    title: "Exchange",
    icon: <BsCartCheck />,
    link: "/exchange",
    slug: "exchange",
  },
  {
    title: "Invoice",
    icon: <FaFileInvoiceDollar />,
    link: "/invoice",
    slug: "invoice",
  },
  {
    title: "Money",
    icon: <CiMoneyBill />,
    link: "/money",
    slug: "money",
  },
  {
    title: "Payment",
    icon: <BsCartCheckFill />,
    link: "/payment",
    slug: "payment",
  },
  {
    title: "Address",
    icon: <MdOutlineLocationOn />,
    link: "/address",
    slug: "address",
  },
  {
    title: "Profile",
    icon: <FaRegUser />,
    link: "/profile",
    slug: "profile",
  },
];

export const currencyAddress = ["Bitcoin(USD)", "ETHEREUM", "Naira", "Perfect Money", "TRON", "USDT-TRC20", "USDT"]