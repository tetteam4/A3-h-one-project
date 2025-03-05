import { useState } from "react";
import axios, { Axios } from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const S_Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("All");
  const [formData, setFormData] = useState({
    sender: {
      name: "",
      fatherName: "",
      phoneNumber: "",
      idNumber: "",
      biometric: "",
    },
    receiver: {
      name: "",
      fatherName: "",
      phoneNumber: "",
      idNumber: "",
      biometric: "",
    },
    amount: "",
    commission: "",
    amountToPay: "",
    agent: "",
  });

  const [modalType, setModalType] = useState(null);

  const openModal = (type) => setModalType(type);
  const closeModal = () => {
    setModalType(null);
    // setFormData((prev) => {
    //   ...prev
    // })
  };

  const handleChange = (e, section) => {
    const { name, value } = e.target;
    if (
      section === "amount" ||
      section === "commission" ||
      section === "amountToPay" ||
      section === "agent"
    ) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        amountToPay:
          name === "amount" || name === "commission"
            ? prev.amount - prev.commission
            : prev.amountToPay,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [section]: { ...prev[section], [name]: value },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare sender data
      const senderData = {
        name: formData.sender.name,
        father_name: formData.sender.fatherName,
        phone_number: formData.sender.phoneNumber,
        id_card: formData.sender.idNumber || null,
        biometric: formData.sender.biometric || false,
      };

      // Prepare receiver data
      const receiverData = {
        name: formData.receiver.name,
        father_name: formData.receiver.fatherName,
        phone_number: formData.receiver.phoneNumber,
        id_card: formData.receiver.idNumber || null,
        biometric: formData.receiver.biometric || false,
      };

      // Send sender data and get ID
      const resSender = await axios.post(
        `${BASE_URL}/api/api/customers/`,
        senderData
      );
      const senderId = resSender.data.id; // Assuming API returns { id: ... }
      console.log(resSender);

      // Send receiver data and get ID
      const resReceiver = await axios.post(
        `${BASE_URL}/api/api/customers/`,
        receiverData
      );
      const receiverId = resReceiver.data.id; // Assuming API returns { id: ... }
      console.log(resReceiver);

      // Prepare transaction data
      const transactionData = {
        branch: null,
        sender: senderId,
        receiver: receiverId,
        amount: formData.amount || null,
        fee: formData.commission || null,
        status: "pending", // You can change this based on your logic
      };

      // Send transaction data to API
      console.log(transactionData);

      await axios.post(
        `http://localhost:8000/api/api/transactions/`,
        transactionData
      );

      // Reset form data after successful submission
      setFormData({
        sender: {
          name: "",
          fatherName: "",
          phoneNumber: "",
          idNumber: "",
          biometric: false,
        },
        receiver: {
          name: "",
          fatherName: "",
          phoneNumber: "",
          idNumber: "",
          biometric: false,
        },
        amount: "",
        commission: "",
        amountToPay: "",
        agent: "",
      });

      console.log("Transaction submitted successfully!");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleResetModel = (modelType) => {
    setFormData((prevData) => {
      if (modelType === "sender") {
        return {
          ...prevData,
          sender: { name: "", fatherName: "", phoneNumber: "" },
        };
      } else if (modelType === "receiver") {
        return {
          ...prevData,
          receiver: { name: "", fatherName: "", idNumber: "", biometric: "" },
        };
      }
      return prevData;
    });
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold">💰 Transactions</h1>
      <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-3">New Transaction</h2>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => openModal("sender")}
            className="p-2 border rounded bg-blue-100"
          >
            Sender
          </button>
          <button
            type="button"
            onClick={() => openModal("receiver")}
            className="p-2 border rounded bg-blue-100"
          >
            Receiver
          </button>
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={(e) => handleChange(e, "amount")}
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            name="commission"
            placeholder="Commission"
            value={formData.commission}
            onChange={(e) => handleChange(e, "commission")}
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            name="amountToPay"
            placeholder="Amount to Pay"
            value={formData.amountToPay}
            readOnly
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="agent"
            placeholder="Agent"
            value={formData.agent}
            onChange={(e) => handleChange(e, "agent")}
            className="p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </form>

      {modalType && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-xl font-semibold mb-3">
              {modalType === "sender" ? "Sender Details" : "Receiver Details"}
            </h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData[modalType].name}
              onChange={(e) => handleChange(e, modalType)}
              className="p-2 border rounded w-full mb-2"
              required
            />
            <input
              type="text"
              name="fatherName"
              placeholder="Father Name"
              value={formData[modalType].fatherName}
              onChange={(e) => handleChange(e, modalType)}
              className="p-2 border rounded w-full mb-2"
              required
            />
            <input
              type="text"
              name="idNumber"
              placeholder="ID Number"
              value={formData[modalType].idNumber}
              onChange={(e) => handleChange(e, modalType)}
              className="p-2 border rounded w-full mb-2"
            />
            <input
              type="text"
              name="biometric"
              placeholder="Biometric Data"
              value={formData[modalType].biometric}
              onChange={(e) => handleChange(e, modalType)}
              className="p-2 border rounded w-full mb-2"
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData[modalType].phoneNumber}
              onChange={(e) => handleChange(e, modalType)}
              className="p-2 border rounded w-full mb-2"
              required
            />
            <button
              onClick={() => {
                closeModal();
                handleResetModel(modalType);
              }}
              className="mt-4 p-2 bg-red-500 text-white rounded"
            >
              Close
            </button>
            <button
              onClick={closeModal}
              className="mt-4 p-2 bg-green-500 text-white rounded"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default S_Transaction;
