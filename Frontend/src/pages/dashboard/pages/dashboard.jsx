import { useState } from "react";

const Dashboard = () => {
  // Initial data
  const [activePage, setActivePage] = useState("home");
  const [stats] = useState({
    totalTransactions: 1200,
    pendingTransactions: 45,
    completedTransactions: 1155,
    totalCustomers: 800,
    activeCustomers: 650,
    totalAgents: 120,
    activeAgents: 100,
  });

  const [recentTransactions] = useState([
    { id: 1, customer: "Ahmad Sharifi", amount: "$500", status: "Completed" },
    { id: 2, customer: "Zahra Habibi", amount: "$300", status: "Pending" },
    { id: 3, customer: "Mohammad Amini", amount: "$1200", status: "Completed" },
    { id: 4, customer: "Ali Reza", amount: "$750", status: "Pending" },
    { id: 5, customer: "Fatima Qasemi", amount: "$900", status: "Completed" },
  ]);

  return (
    <div className="flex">
      <div className="flex-1 p-6 bg-white min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          📊 Hawala Dashboard
        </h1>
        <p className="text-gray-600 mb-6">
          Overview of transactions and system status.
        </p>

        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">Total Transactions</h2>
            <p className="text-2xl">{stats.totalTransactions}</p>
          </div>
          <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">Pending Transactions</h2>
            <p className="text-2xl">{stats.pendingTransactions}</p>
          </div>
          <div className="bg-green-500 text-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">Completed Transactions</h2>
            <p className="text-2xl">{stats.completedTransactions}</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          📜 Recent Transactions
        </h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">ID</th>
                <th className="border p-2">Customer</th>
                <th className="border p-2">Amount</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((tx) => (
                <tr key={tx.id} className="text-center">
                  <td className="border p-2">{tx.id}</td>
                  <td className="border p-2">{tx.customer}</td>
                  <td className="border p-2">{tx.amount}</td>
                  <td
                    className={`border p-2 font-bold ${
                      tx.status === "Completed"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {tx.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
