import { useState } from "react";

const Sidebar = ({ setActiveComponent }) => {
  const [activeC, setActiveC] = useState("dashboard");
  const Components = [
    { name: "Dashboard", value: "dashboard" },
    { name: "Transaction", value: "transaction" },
    { name: "Customer", value: "customer" },
    { name: "Agent", value: "agent" },
    { name: "Report", value: "report" },
    { name: "Settings", value: "setting" },
  ];

  return (
    <div className="bg-gray-900 text-white w-64 h-screen p-4">
      <h2 className="text-xl font-bold mb-4">Hawala System</h2>
      <ul className="space-y-2">
        {Components.map((component, index) => (
          <li key={index}>
            <button
              onClick={() => {
                setActiveComponent(component.value);
                setActiveC(component.value);
              }}
              className={`${
                activeC === component.value
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }  block w-full text-left p-2 hover:bg-gray-700 rounded`}
            >
              {component.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
