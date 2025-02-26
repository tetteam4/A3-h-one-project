import { useState } from "react";

const Transaction = () => {
  // Sample initial transactions
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      sender: "Ali Khan",
      receiver: "Hassan Noor",
      amount: 500,
      status: "Pending",
      date: "2025-02-26",
    },
    {
      id: 2,
      sender: "Sara Ahmad",
      receiver: "Zubair Rehman",
      amount: 1200,
      status: "Completed",
      date: "2025-02-25",
    },
    {
      id: 3,
      sender: "Omar Yusuf",
      receiver: "Fatima Karim",
      amount: 800,
      status: "Failed",
      date: "2025-02-24",
    },
  ]);

  const [filter, setFilter] = useState("All");

  // Filter transactions based on status
  const filteredTransactions =
    filter === "All"
      ? transactions
      : transactions.filter((t) => t.status === filter);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
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

      {/* Transaction List */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Sender</th>
              <th className="p-2 border">Receiver</th>
              <th className="p-2 border">Amount ($)</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="text-center">
                  <td className="p-2 border">{transaction.id}</td>
                  <td className="p-2 border">{transaction.sender}</td>
                  <td className="p-2 border">{transaction.receiver}</td>
                  <td className="p-2 border">${transaction.amount}</td>
                  <td
                    className={`p-2 border font-bold ${
                      transaction.status === "Completed"
                        ? "text-green-600"
                        : transaction.status === "Pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.status}
                  </td>
                  <td className="p-2 border">{transaction.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
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

export default Transaction;
