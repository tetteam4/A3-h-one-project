import { useState } from "react";

const Customer = () => {
  // Initial customer data
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Ahmad Sharifi",
      fatherName: "Sharif",
      idNumber: "123456",
      phoneNumber: "0791112233",
      biometric: "Yes",
      verified: true,
    },
    {
      id: 2,
      name: "Zahra Habibi",
      fatherName: "Habib",
      idNumber: "654321",
      phoneNumber: "0784445566",
      biometric: "No",
      verified: false,
    },
    {
      id: 3,
      name: "Mohammad Amini",
      fatherName: "Amin",
      idNumber: "987654",
      phoneNumber: "0779998877",
      biometric: "Yes",
      verified: true,
    },
  ]);

  // New customer state
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    fatherName: "",
    idNumber: "",
    phoneNumber: "",
    biometric: "",
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
    if (
      !newCustomer.name ||
      !newCustomer.fatherName ||
      !newCustomer.idNumber ||
      !newCustomer.phoneNumber ||
      !newCustomer.biometric
    )
      return;
    setCustomers([...customers, { id: customers.length + 1, ...newCustomer }]);
    setNewCustomer({
      name: "",
      fatherName: "",
      idNumber: "",
      phoneNumber: "",
      biometric: "",
      verified: false,
    });
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
            <th className="border p-2">Father Name</th>
            <th className="border p-2">ID Number</th>
            <th className="border p-2">Phone Number</th>
            <th className="border p-2">Biometric</th>
            <th className="border p-2">Verified</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} className="text-center">
              <td className="border p-2">{customer.id}</td>
              <td className="border p-2">{customer.name}</td>
              <td className="border p-2">{customer.fatherName}</td>
              <td className="border p-2">{customer.idNumber}</td>
              <td className="border p-2">{customer.phoneNumber}</td>
              <td className="border p-2">{customer.biometric}</td>
              <td className="border p-2">{customer.verified ? "✅" : "❌"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form to add a new customer */}
      <div className="flex flex-wrap gap-2">
        <input
          type="text"
          name="name"
          placeholder="Customer Name"
          value={newCustomer.name}
          onChange={handleChange}
          className="border p-2 rounded w-1/5"
        />
        <input
          type="text"
          name="fatherName"
          placeholder="Father Name"
          value={newCustomer.fatherName}
          onChange={handleChange}
          className="border p-2 rounded w-1/5"
        />
        <input
          type="text"
          name="idNumber"
          placeholder="ID Number"
          value={newCustomer.idNumber}
          onChange={handleChange}
          className="border p-2 rounded w-1/5"
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={newCustomer.phoneNumber}
          onChange={handleChange}
          className="border p-2 rounded w-1/5"
        />
        <input
          type="text"
          name="biometric"
          placeholder="Biometric Data"
          value={newCustomer.biometric}
          onChange={handleChange}
          className="border p-2 rounded w-1/5"
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
