import React from "react";

const HomeTable = () => {
  return (
    <div className="w-full flex item-center justify-center px-5 my-10">
      <table className="w-full container divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              S/N
            </th>
            <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Send
            </th>
            <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Receive
            </th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-1 border-gray-400 bg-blue-100">
            <td className="px-3 md:px-6 py-2 whitespace-nowrap">1</td>
            <td className="px-3 md:px-6 py-2 whitespace-nowrap">BTC (USD)</td>
            <td className="px-3 md:px-6 py-2 whitespace-nowrap">
              NGN 1,530.00
            </td>
          </tr>

          <tr className="border-1 border-gray-400">
            <td className="px-3 md:px-6 py-2 whitespace-nowrap">2</td>
            <td className="px-3 md:px-6 py-2 whitespace-nowrap">PM (USD)</td>
            <td className="px-3 md:px-6 py-2 whitespace-nowrap">
              NGN 1,000.00
            </td>
          </tr>

          <tr className="border-1 border-gray-400 bg-blue-100">
            <td className="px-3 md:px-6 py-2 whitespace-nowrap">3</td>
            <td className="px-3 md:px-6 py-2 whitespace-nowrap">BTC (USD)</td>
            <td className="px-3 md:px-6 py-2 whitespace-nowrap">PM 0.97</td>
          </tr>

          <tr className="border-1 border-gray-400">
            <td className="px-3 md:px-6 py-2 whitespace-nowrap">4</td>
            <td className="px-3 md:px-6 py-2 whitespace-nowrap">PM</td>
            <td className="px-3 md:px-6 py-2 whitespace-nowrap">
              BTC (USD) 0.90
            </td>
          </tr>

          <tr className="border-1 border-gray-400 bg-blue-100">
            <td className="px-3 md:px-6 py-2 whitespace-nowrap">5</td>
            <td className="px-3 md:px-6 py-2 whitespace-nowrap">USDT-TRC20</td>
            <td className="px-3 md:px-6 py-2 whitespace-nowrap">
              NGN 1,530.00
            </td>
          </tr>

          <tr className="border-1 border-gray-400">
            <td className="px-3 md:px-6 py-2 whitespace-nowrap">6</td>
            <td className="px-3 md:px-6 py-2 whitespace-nowrap">
              USDT-ERC20 BC
            </td>
            <td className="px-3 md:px-6 py-2 whitespace-nowrap">
              NGN 1,550.00
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HomeTable;
