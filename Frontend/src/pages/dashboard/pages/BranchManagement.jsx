import { useEffect, useState } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import axios from "axios";

const BranchManagement = () => {
  const [branches, setBranches] = useState([]);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    manager: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchBranches();
    fetchUsers();
  }, []);

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

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/api/users/`);
      // Filter users with role = 1
      // const filteredUsers = response.data.filter((user) => user.role === 1);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update existing branch
        await axios.put(
          `${BASE_URL}/api/api/branches/${editingId}/`,
          formData
        );
      } else {
        // Add new branch
        await axios.post(`${BASE_URL}/api/api/branches/`, formData);
      }
      fetchBranches(); // Refresh the list
      setFormData({ name: "", location: "", manager: "" });
      setEditingId(null);
    } catch (error) {
      console.error("Error saving branch:", error);
    }
  };

  const handleEdit = (branch) => {
    setFormData({
      name: branch.name,
      location: branch.location,
      manager: branch.manager,
    });
    setEditingId(branch.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this branch?")) return;
    try {
      await axios.delete(`${BASE_URL}/api/api/branches/${id}/`);
      fetchBranches(); // Refresh after deletion
    } catch (error) {
      console.error("Error deleting branch:", error);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">
        {editingId ? "Edit Branch" : "Branch Management"}
      </h2>
      <form onSubmit={handleSubmit} className="mb-4 space-y-2">
        <input
          type="text"
          name="name"
          placeholder="Branch Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <select
          name="manager"
          value={formData.manager}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Manager</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.first_name} {user.last_name} ({user.email})
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          {editingId ? "Update Branch" : "Add Branch"}
        </button>
      </form>
      <h3 className="text-lg font-medium mb-2">Existing Branches</h3>
      <ul>
        {branches.map((branch) => (
          <li
            key={branch.id}
            className="p-2 border-b flex justify-between items-center"
          >
            <div>
              <strong>{branch.name}</strong> - {branch.location} (Manager ID:{" "}
              {branch.manager})
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(branch)}
                className="text-sm text-white bg-yellow-500 px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(branch.id)}
                className="text-sm text-white bg-red-500 px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BranchManagement;
