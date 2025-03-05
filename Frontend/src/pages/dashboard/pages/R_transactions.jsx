import { useEffect, useState } from "react";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/api/transactions/"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) return <p>Loading transactions...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Transactions</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Branch</th>
            <th className="border p-2">Sender</th>
            <th className="border p-2">Receiver</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Fee</th>
            <th className="border p-2">Amount Pay</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Secret Key</th>
            <th className="border p-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="border">
              <td className="border p-2">{transaction.id}</td>
              <td className="border p-2">{transaction.branch}</td>
              <td className="border p-2">{transaction.sender}</td>
              <td className="border p-2">{transaction.receiver}</td>
              <td className="border p-2">{transaction.amount}</td>
              <td className="border p-2">{transaction.fee}</td>
              <td className="border p-2">{transaction.amount_pay}</td>
              <td className="border p-2">{transaction.status}</td>
              <td className="border p-2">{transaction.secret_key}</td>
              <td className="border p-2">
                {new Date(transaction.created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
