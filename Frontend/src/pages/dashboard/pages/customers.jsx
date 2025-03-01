import { useState } from "react";

const Customer = () => {
  // Initial customer data
  const [customers, setCustomers] = useState([
    { id: 1, name: "Ahmad Sharifi", phone: "0791112233", verified: true },
    { id: 2, name: "Zahra Habibi", phone: "0784445566", verified: false },
    { id: 3, name: "Mohammad Amini", phone: "0779998877", verified: true },
  ]);

  // New customer state
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    verified: false,
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewCustomer({
      ...newCustomer,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Add new customer
  const addCustomer = () => {
    if (!newCustomer.name || !newCustomer.phone) return;
    setCustomers([...customers, { id: customers.length + 1, ...newCustomer }]);
    setNewCustomer({ name: "", phone: "", verified: false });
  };

  return (
    <div className="p-4 bg-white text-gray-900 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      <p className="mb-4">
        Manage customer details, transactions, and verification status.
      </p>

      {/* Table to display customers */}
      <table className="w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Verified</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} className="text-center">
              <td className="border p-2">{customer.id}</td>
              <td className="border p-2">{customer.name}</td>
              <td className="border p-2">{customer.phone}</td>
              <td className="border p-2">{customer.verified ? "✅" : "❌"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form to add a new customer */}
      <div className="flex gap-2">
        <input
          type="text"
          name="name"
          placeholder="Customer Name"
          value={newCustomer.name}
          onChange={handleChange}
          className="border p-2 rounded w-1/3"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={newCustomer.phone}
          onChange={handleChange}
          className="border p-2 rounded w-1/3"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="verified"
            checked={newCustomer.verified}
            onChange={handleChange}
          />
          <span>Verified</span>
        </label>
        <button
          onClick={addCustomer}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Customer
        </button>
      </div>
    </div>
  );
};

export default Customer;
