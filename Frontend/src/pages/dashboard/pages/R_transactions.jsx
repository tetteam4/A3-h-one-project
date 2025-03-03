import { useState } from "react";

const R_Transaction = () => {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      sender: "Ali Khan Mohammadi",
      receiver: "Hassan Noor Mohammadi",
      amount: 5000000,
      commission: 500,
      amountToPay: 5000500,
      agent: "Agent A",
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
  const [formData, setFormData] = useState({
    sender: "",
    receiver: "",
    amount: "",
    commission: "",
    amountToPay: "",
    agent: "",
  });

  const filteredTransactions =
    filter === "All"
      ? transactions
      : transactions.filter((t) => t.status === filter);

  return (
    <div className="p-6 bg-white min-h-screen">
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
      <div className="bg-white shadow-md overflow-hidden">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-gray-200 border border-gray-300">
              <th className="p-2 w-[6%]">#</th>
              <th className="p-2 w-[12%]">Sender</th>
              <th className="p-2 w-[13%]">Receiver</th>
              <th className="p-2 w-[6%]">Amount</th>
              <th className="p-2 w-[6%]">Commission</th>
              <th className="p-2 w-[6%]">Amount to Pay</th>
              <th className="p-2 w-[10%]">Agent</th>
              <th className="p-2 w-[10%]">Status</th>
              <th className="p-2 w-[10%]">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="text-center border-b border-gray-300 hover:bg-gray-100"
                >
                  <td className="p-1.5">{transaction.id}</td>
                  <td className="p-1.5">{transaction.sender}</td>
                  <td className="p-1.5">{transaction.receiver}</td>
                  <td className="p-1.5">{transaction.amount}</td>
                  <td className="p-1.5">{transaction.commission}</td>
                  <td className="p-1.5">{transaction.amountToPay}</td>
                  <td className="p-1.5">{transaction.agent}</td>
                  <td
                    className={`p-1.5 font-bold ${
                      transaction.status === "Completed"
                        ? "text-green-600"
                        : transaction.status === "Pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.status}
                  </td>
                  <td className="p-1.5">{transaction.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="p-4 text-center text-gray-500">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default R_Transaction;
