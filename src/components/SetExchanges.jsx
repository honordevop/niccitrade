import useSWR from "swr";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const fetcher = (url) => fetch(url).then((r) => r.json());

const SetExchanges = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { data, mutate, error } = useSWR(`/api/admin/exchanges`, fetcher);
  const [exchangeRecords, setExchangeRecords] = useState([]);

  // Update exchangeRecords whenever data changes
  useEffect(() => {
    if (data?.exchanges) {
      setExchangeRecords(data.exchanges);
    }
  }, [data]);

  const handleUpdate = async (exchange, newAmount, id) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/exchanges/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: newAmount }),
      });

      if (res.ok) {
        toast("Exchange Updated");
        mutate(); // Refresh the data
      } else {
        console.error("Error updating record:", await res.text());
        toast.error("Error updating record");
      }
    } catch (error) {
      toast.error("Error during update:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    // setDeleting(true);
    const userConfirmed = confirm("Are you sure you want to Delete?");

    if (!userConfirmed) {
      // setDeleting(false);
      return;
    }

    try {
      const response = await fetch(`/api/admin/exchanges/${id}`, {
        method: "DELETE",
      });

      const res = await response.json();
      mutate();
      toast(res?.message);

      // setTimeout(() => {
      //   setDeleting(false);
      // }, 1500);
    } catch (error) {
      // setError(error?.response);
      // setDeleting(false);
      toast(error?.message);
      // console.log(error?.response);
    }
  };

  return (
    <div className="p-5">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Exchange</th>
            <th className="border border-gray-300 px-4 py-2">Amount</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {exchangeRecords?.map((record, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">
                {record?.exchange}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="number"
                  value={record?.amount}
                  onChange={(e) => {
                    const newAmount = e.target.value;
                    setExchangeRecords((prev) =>
                      prev.map((item, i) =>
                        i === index ? { ...item, amount: newAmount } : item
                      )
                    );
                  }}
                  className="border rounded px-2 py-1 w-full"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2 flex gap-2">
                <button
                  onClick={() =>
                    handleUpdate(record?.exchange, record?.amount, record?._id)
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

                <button
                  onClick={() => handleDelete(record?._id)}
                  disabled={isLoading}
                  className={`px-3 py-1 text-white bg-red-600
                  } rounded`}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SetExchanges;
