import { useState, useEffect } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

const MoneyUpdate = ({ hideForm, userEmail }) => {
  const { data, mutate, error } = useSWR(
    `/api/money?email=${userEmail}`,
    fetcher
  );
  //   console.log(data);moneyRecord?.moneyRecord[0]
  const [moneyRecords, setMoneyRecords] = useState(
    data?.moneyRecord?.moneyrecord
  );
  //   const [id, setId] = useState(data?.moneyRecord[0]?._id); // To store the email
  const [isLoading, setIsLoading] = useState(false); // For button state

  // Fetch the money records from the server

  console.log(data?.moneyRecord?.moneyrecord);
  // Function to handle the update
  const handleUpdate = async (currency, newAmount, recordId) => {
    setIsLoading(true);

    try {
      const res = await fetch(`/api/money/${recordId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          //   id, // Include email
          currency,
          amount: newAmount,
        }),
      });

      mutate();
      if (res.ok) {
        const updatedRecord = await res.json();
        // Update the local state with the new amount
        setMoneyRecords((prev) =>
          prev.map((record) =>
            record.currency === currency
              ? { ...record, amount: updatedRecord.amount }
              : record
          )
        );
        hideForm();
      } else {
        console.error("Error updating record:", await res.text());
      }
    } catch (error) {
      console.error("Error during update:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (data?.moneyRecord?.moneyrecord) {
    return (
      <div className="p-5">
        {/* <h1 className="text-xl font-bold mb-4">Money Records for {email}</h1> */}
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Currency</th>
              <th className="border border-gray-300 px-4 py-2">Amount</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {moneyRecords?.map((record, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">
                  {record?.currency}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    value={record?.amount}
                    onChange={(e) => {
                      const newAmount = e.target.value;
                      setMoneyRecords((prev) =>
                        prev.map((item, i) =>
                          i === index ? { ...item, amount: newAmount } : item
                        )
                      );
                    }}
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() =>
                      handleUpdate(
                        record?.currency,
                        record?.amount,
                        data?.moneyRecord?._id
                      )
                    }
                    disabled={isLoading}
                    className={`px-3 py-1 text-white ${
                      isLoading
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    } rounded`}
                  >
                    {isLoading ? "Updating..." : "Update"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex gap-5">
          <button
            className="w-full mt-6 bg-gray-200 hover:bg-gray-50 rounded-lg px-8 py-2 text-black  uppercase font-semibold"
            onClick={hideForm}
          >
            Close
          </button>
        </div>
      </div>
    );
  }
};

export default MoneyUpdate;
