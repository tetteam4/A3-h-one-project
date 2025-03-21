import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { useSelector } from "react-redux";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const S_Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("All");
  const [branches, setBranches] = useState([]);
  const [formData, setFormData] = useState({
    sender: {
      name: "",
      fatherName: "",
      phoneNumber: "",
      branch: "",
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
    agent: "",
    current_branch: "",
    to_branch: "",
  });
  const [modalType, setModalType] = useState(null);
  const user = useSelector((state) => state.user.currentUser);
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
      section === "amountToPay"
    ) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        amountToPay:
          name === "amount" || name === "commission"
            ? prev.amount - prev.commission
            : prev.amountToPay,
      }));
    } else if (section === "to_branch") {
      // Update branch separately
      setFormData((prev) => ({
        ...prev,
        to_branch: value, // Set branch directly
      }));
    } else if (section === "current_branch") {
      // Update branch separately
      setFormData((prev) => ({
        ...prev,
        current_branch: value, // Set branch directly
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [section]: { ...prev[section], [name]: value },
      }));
    }
  };

  const fetchBranches = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/api/branches/`
      );
      setBranches(response.data);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };
  useEffect(() => {
    fetchBranches();
    console.log(user);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let senderId = null;
    let receiverId = null;

    try {
      // Prepare sender and receiver data
      const senderData = {
        name: formData.sender.name,
        father_name: formData.sender.fatherName,
        phone_number: formData.sender.phoneNumber,
        id_card: formData.sender.idNumber || null,
        biometric: formData.sender.biometric || false,
      };

      const receiverData = {
        name: formData.receiver.name,
        father_name: formData.receiver.fatherName,
        phone_number: formData.receiver.phoneNumber,
        id_card: formData.receiver.idNumber || null,
        biometric: formData.receiver.biometric || false,
      };

      // Create sender and receiver concurrently
      const [resSender, resReceiver] = await Promise.all([
        axios.post(`${BASE_URL}/api/api/customers/`, senderData),
        axios.post(`${BASE_URL}/api/api/customers/`, receiverData),
      ]);

      senderId = resSender.data.id;
      receiverId = resReceiver.data.id;
      console.log(resSender, resReceiver);

      // Prepare transaction data
      const transactionData = {
        current_branch: 1,
        sender: senderId,
        receiver: receiverId,
        amount: formData.amount || null,
        fee: formData.commission || null,
        status: "pending",
        agent: user.id || null,
        to_branch: formData.to_branch,
      };

      // Send transaction data
      const transaction = await axios.post(
        `${BASE_URL}/api/api/transactions/`,
        transactionData
      );

      if (transaction.status === 201) {
        // Reset form on success
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
        console.log("Transaction submitted successfully!", transaction);
      } else {
        throw new Error("Transaction creation failed.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("An error occurred. The operation has been cancelled.");

      // Rollback sender if created
      if (senderId) {
        try {
          await axios.delete(`${BASE_URL}/api/api/customers/${senderId}/`);
          console.log("Sender data rolled back successfully.");
        } catch (rollbackError) {
          console.error("Failed to rollback sender data:", rollbackError);
        }
      }

      // Rollback receiver if created
      if (receiverId) {
        try {
          await axios.delete(`${BASE_URL}/api/api/customers/${receiverId}/`);
          console.log("Receiver data rolled back successfully.");
        } catch (rollbackError) {
          console.error("Failed to rollback receiver data:", rollbackError);
        }
      }
    }
  };

  const handleResetModel = (modelType) => {
    setFormData((prevData) => ({
      ...prevData,
      [modelType]: {
        name: "",
        fatherName: "",
        phoneNumber: "",
        idNumber: "",
        biometric: false,
      },
    }));
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
          <select
            name="to_branch"
            value={formData.to_branch || ""}
            onChange={(e) => handleChange(e, "to_branch")}
            className="border p-2 w-full"
          >
            <option value="">Select to Branch</option>
            {branches.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.name}
              </option>
            ))}
          </select>
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
            <label className="flex items-center">
              <input
                type="checkbox"
                name="biometric"
                checked={formData[modalType].biometric}
                onChange={(e) =>
                  handleChange(
                    { target: { name: "biometric", value: e.target.checked } },
                    modalType
                  )
                }
                className="p-2 border rounded mr-2"
              />
              Biometric Data
            </label>

            <input
              type="text"
              name="phoneNumber"
              placeholder="+93777889911"
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
