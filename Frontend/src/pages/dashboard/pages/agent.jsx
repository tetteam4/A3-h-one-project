import { useState } from "react";

const Agent = () => {
  // Initial agent data
  const [agents, setAgents] = useState([
    { id: 1, name: "Ali Khan", location: "Kabul", phone: "0790001111" },
    { id: 2, name: "Hassan Rahimi", location: "Herat", phone: "0782223333" },
    { id: 3, name: "Sara Ahmadi", location: "Mazar", phone: "0775556666" },
  ]);

  // New agent state
  const [newAgent, setNewAgent] = useState({
    name: "",
    location: "",
    phone: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setNewAgent({ ...newAgent, [e.target.name]: e.target.value });
  };

  // Add new agent
  const addAgent = () => {
    if (!newAgent.name || !newAgent.location || !newAgent.phone) return;
    setAgents([...agents, { id: agents.length + 1, ...newAgent }]);
    setNewAgent({ name: "", location: "", phone: "" });
  };

  return (
    <div className="p-4 bg-white text-gray-900 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Agents</h1>
      <p className="mb-4">Register, manage, and track Hawala agents.</p>

      {/* Table to display agents */}
      <table className="w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Location</th>
            <th className="border p-2">Phone</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent) => (
            <tr key={agent.id} className="text-center">
              <td className="border p-2">{agent.id}</td>
              <td className="border p-2">{agent.name}</td>
              <td className="border p-2">{agent.location}</td>
              <td className="border p-2">{agent.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form to add a new agent */}
      <div className="flex gap-2">
        <input
          type="text"
          name="name"
          placeholder="Agent Name"
          value={newAgent.name}
          onChange={handleChange}
          className="border p-2 rounded w-1/4"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newAgent.location}
          onChange={handleChange}
          className="border p-2 rounded w-1/4"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={newAgent.phone}
          onChange={handleChange}
          className="border p-2 rounded w-1/4"
        />
        <button
          onClick={addAgent}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Agent
        </button>
      </div>
    </div>
  );
};

export default Agent;
