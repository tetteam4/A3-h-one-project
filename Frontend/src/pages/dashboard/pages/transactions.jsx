import { useState } from "react";

const Transaction = () => {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      sender: "Ali Khan Mohammadi",
      receiver: "Hassan Noor Mohammadi",
      amount: 5000000,
      currency: "AFN",
      phone: "+93771111111",
      fingerprint: "biometric_data_2",
      status: "Pending",
      date: "2025-02-26",
      printBill: true,
      country: "Afghanistan",
    },
    {
      id: 2,
      sender: "Ali Khan Mohammadi",
      receiver: "Hassan Noor Mohammadi",
      amount: 5000000,
      currency: "AFN",
      phone: "+93771111111",
      fingerprint: "biometric_data_2",
      status: "Pending",
      date: "2025-02-26",
      printBill: true,
      country: "Afghanistan",
    },
    {
      id: 3,
      sender: "Ali Khan Mohammadi",
      receiver: "Hassan Noor Mohammadi",
      amount: 5000000,
      currency: "AFN",
      phone: "+93771111111",
      fingerprint: "biometric_data_2",
      status: "Pending",
      date: "2025-02-26",
      printBill: true,
      country: "Afghanistan",
    },
    {
      id: 4,
      sender: "Ali Khan Mohammadi",
      receiver: "Hassan Noor Mohammadi",
      amount: 5000000,
      currency: "AFN",
      phone: "+93771111111",
      fingerprint: "biometric_data_2",
      status: "Pending",
      date: "2025-02-26",
      printBill: true,
      country: "Afghanistan",
    },
  ]);

  const [filter, setFilter] = useState("All");

  const filteredTransactions =
    filter === "All"
      ? transactions
      : transactions.filter((t) => t.status === filter);

  return (
    <div className="  p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">💰 Transactions</h1>
      <p className="text-gray-600 mb-6">
        View, manage, and track all Hawala transactions.
      </p>

      {/* Filters */}
      <div className="mb-4">
        <label className="font-semibold text-gray-700 mr-2">
          Filter by Status:
        </label>
        <select
          className="p-2 border rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      {/* Transaction Table */}
      <div className="bg-white  shadow-md overflow-hidden">
        <div className="w-full overflow-hidden">
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-gray-200 border border-gray-300">
                <th className="p-2  w-[6%]">Number</th>
                <th className="p-2   w-[12%]">Sender</th>
                <th className="p-2   w-[13%]">Receiver</th>
                <th className="p-2  w-[6%]">Amount</th>
                <th className="p-2  w-[6%]">Currency</th>
                <th className="p-2  w-[10%]">Sender Phone</th>
                <th className="p-2  w-[10%]">Sender Finger</th>
                <th className="p-2  w-[10%]">Country</th>
                <th className="p-2  w-[10%]">Status</th>
                <th className="p-2  w-[10%]">Date</th>
                <th className="p-2  w-[7%]">Bill</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="text-center hover:bg-primary border-b border-gray-300 hover:text-white">
                    <td className="p-1.5 ">{transaction.id}</td>
                    <td className="p-1.5 ">{transaction.sender}</td>
                    <td className="p-1.5 ">{transaction.receiver}</td>
                    <td className="p-1.5 ">{transaction.amount}</td>
                    <td className="p-1.5 ">{transaction.currency}</td>
                    <td className="p-1.5 ">{transaction.phone}</td>
                    <td className="p-1.5 ">{transaction.fingerprint}</td>
                    <td className="p-1.5 ">{transaction.country}</td>
                    <td
                      className={`p-1.5  font-bold ${
                        transaction.status === "Completed"
                          ? "text-green-600"
                          : transaction.status === "Pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.status}
                    </td>
                    <td className="p-1.5 ">{transaction.date}</td>
                    <td className="p-1.5 ">
                      {transaction.printBill ? "✅ Yes" : "❌ No"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="p-4 text-center text-gray-500">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
