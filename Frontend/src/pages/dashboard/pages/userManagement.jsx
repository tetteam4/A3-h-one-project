import { useState, useEffect } from "react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    role: null,
    branch: null,
    phone_number: "",
    password: "",
    password_confirm: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const roles = [
    { id: 1, name: "Branch admin" },
    { id: 2, name: "Agent" },
  ];
  useEffect(() => {
    fetchUsers();
    fetchBranches();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/auth/api/users/`);
      setUsers(response.data);
    } catch (error) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const fetchBranches = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/api/branches/`);
      setBranches(response.data);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditMode) {
        await axios.put(
          `${BASE_URL}/auth/api/users/${editUserId}/`,
          formData
        );
        alert("User updated successfully");
      } else {
        await axios.post(`${BASE_URL}/auth/api/users/`, formData);
        alert("User registered successfully");
      }
      fetchUsers();
      resetForm();
    } catch (error) {
      alert("Operation failed");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setFormData(user);
    setIsEditMode(true);
    setEditUserId(user.id);
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`${BASE_URL}/auth/api/users/${userId}/`);
        alert("User deleted successfully");
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      role: null,
      branch: null,
      phone_number: "",
      password: "",
      password_confirm: "",
    });
    setIsEditMode(false);
    setEditUserId(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">User Management</h2>
      <form onSubmit={handleSubmit} className="mb-4 space-y-2">
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <select
          name="role"
          value={formData.role || ""}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        >
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <select
          name="branch"
          value={formData.branch}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        >
          <option value="">Select Branch</option>
          {branches.map((branch) => (
            <option key={branch.id} value={branch.id}>
              {branch.name}
            </option>
          ))}
        </select>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="password"
          name="password_confirm"
          placeholder="Confirm Password"
          value={formData.password_confirm}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {isEditMode ? "Update User" : "Register User"}
        </button>
        {isEditMode && (
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-500 text-white p-2 rounded ml-2"
          >
            Cancel
          </button>
        )}
      </form>

      <h3 className="text-lg font-bold mt-4">Registered Users</h3>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Branch</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-50">
              <td>{user.id}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.phone_number}</td>
              <td>
                {branches.find((branch) => branch.id === user.branch)?.name ||
                  "N/A"}
              </td>
              <td>
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-yellow-500 text-white p-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
