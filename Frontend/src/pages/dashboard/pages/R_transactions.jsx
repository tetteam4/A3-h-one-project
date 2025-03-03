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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      id: transactions.length + 1,
      ...formData,
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
      currency: "AFN",
      phone: "N/A",
      fingerprint: "N/A",
      printBill: true,
      country: "Afghanistan",
    };
    setTransactions([...transactions, newTransaction]);
    setFormData({
      sender: "",
      receiver: "",
      amount: "",
      commission: "",
      amountToPay: "",
      agent: "",
    });
  };

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

      {/* Form for New Transaction */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 bg-gray-100 p-4 rounded shadow"
      >
        <h2 className="text-xl font-semibold mb-3">Submit a New Transaction</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="sender"
            placeholder="Sender"
            value={formData.sender}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="receiver"
            placeholder="Receiver"
            value={formData.receiver}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            name="commission"
            placeholder="Commission"
            value={formData.commission}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            name="amountToPay"
            placeholder="Amount to Pay"
            value={formData.amountToPay}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="agent"
            placeholder="Agent"
            value={formData.agent}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Submit Transaction
        </button>
      </form>

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
