import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000/api/api/customers/";

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    father_name: "",
    phone_number: "",
    id_card: "",
    biometric: false,
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(API_URL);
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewCustomer({
      ...newCustomer,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const addCustomer = async () => {
    if (!newCustomer.name || !newCustomer.father_name || !newCustomer.id_card)
      return;

    try {
      const response = await axios.post(API_URL, {
        ...newCustomer,
        id_card: newCustomer.id_card ? parseInt(newCustomer.id_card, 10) : null,
      });
      setCustomers([...customers, response.data]);
      setNewCustomer({
        name: "",
        father_name: "",
        phone_number: "",
        id_card: "",
        biometric: false,
      });
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  return (
    <div className="p-4 bg-white text-gray-900 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      <table className="w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Father Name</th>
            <th className="border p-2">ID Card</th>
            <th className="border p-2">Phone Number</th>
            <th className="border p-2">Biometric</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} className="text-center">
              <td className="border p-2">{customer.id}</td>
              <td className="border p-2">{customer.name}</td>
              <td className="border p-2">{customer.father_name}</td>
              <td className="border p-2">{customer.id_card}</td>
              <td className="border p-2">{customer.phone_number || "N/A"}</td>
              <td className="border p-2">{customer.biometric ? "✅" : "❌"}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
          name="father_name"
          placeholder="Father Name"
          value={newCustomer.father_name}
          onChange={handleChange}
          className="border p-2 rounded w-1/5"
        />
        <input
          type="text"
          name="id_card"
          placeholder="ID Card"
          value={newCustomer.id_card}
          onChange={handleChange}
          className="border p-2 rounded w-1/5"
        />
        <input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          value={newCustomer.phone_number}
          onChange={handleChange}
          className="border p-2 rounded w-1/5"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="biometric"
            checked={newCustomer.biometric}
            onChange={handleChange}
          />
          <span>Biometric</span>
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
