import React, { useState } from "react";
import { SiWebmoney } from "react-icons/si";
import {
  FaTachometerAlt,
  FaExchangeAlt,
  FaUsers,
  FaUserTie,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { signOutSuccess } from "../../state/userSlice/userSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Sidebar = ({ setActiveComponent }) => {
  const [selectedC, setSelectedC] = useState("home");
  const [activeC, setActiveC] = useState("home");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const MySwal = withReactContent(Swal); // Create a SweetAlert2 instance

  const handleSignOut = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, sign out!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(signOutSuccess());
        navigate("/sign-in");
      }
    });
  };

  const Components = [
    { name: "Home", value: "home", icon: <FaTachometerAlt /> },
    {
      name: "Branch managements",
      value: "Branch managements",
      icon: <FaTachometerAlt />,
    },
    {
      name: "User managements",
      value: "user managements",
      icon: <FaUserTie />,
    },
    { name: "Send Money", value: "S_transactions", icon: <FaExchangeAlt /> },
    { name: "Receive Money", value: "R_transactions", icon: <FaExchangeAlt /> },
    { name: "Customer", value: "customer", icon: <FaUsers /> },
    { name: "Report", value: "report", icon: <FaChartBar /> },
    { name: "Settings", value: "setting", icon: <FaCog /> },
    { name: "Sign Out", value: "signout", icon: <FaSignOutAlt /> },
  ];

  return (
    <div
      className={`fixed h-full transition-all duration-500 w-64 bg-primary border-l-[10px] border-[#2a2185] overflow-y-auto `}
    >
      {/* Sidebar Header */}
      <header className="flex items-center justify-between p-5 text-white font-bold text-xl">
        <div className="flex items-center gap-x-4">
          <SiWebmoney className="text-4xl" />
          <span className="text-2xl">Hawala</span>
        </div>
      </header>

      {/* Sidebar Menu */}
      <ul className="mt-6">
        {Components.map((component, index) => (
          <li key={index} className="relative group">
            {component.name === "Sign Out" ? (
              <a
                onClick={handleSignOut}
                className={`relative flex items-center w-full px-6 py-3 transition-all duration-300 rounded-l-3xl
                ${
                  activeC === component.value
                    ? "bg-white text-primary"
                    : "hover:bg-white text-white"
                }`}
              >
                <span className="text-xl">{component.icon}</span>
                <span className="ml-4 text-lg font-semibold">
                  {component.name}
                </span>

                {/* Circle Effects */}
                <span
                  className={`absolute right-0 -top-12 w-12 h-12 bg-transparent rounded-full shadow-[35px_35px_0_10px_white]
                  transition-opacity duration-100
                  ${
                    activeC === component.value
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                ></span>
                <span
                  className={`absolute right-0 -bottom-12 w-12 h-12 bg-transparent rounded-full shadow-[35px_-35px_0_10px_white]
                  transition-opacity duration-100
                  ${
                    activeC === component.value
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                ></span>
              </a>
            ) : (
              <a
                onClick={() => {
                  setActiveComponent(component.value);
                  setSelectedC(component.value);
                  setActiveC(component.value);
                }}
                onMouseEnter={() => setActiveC(component.value)}
                onMouseLeave={() => setActiveC(selectedC)}
                className={`relative flex items-center w-full px-6 py-3 transition-all duration-300 rounded-l-3xl
                ${
                  activeC === component.value
                    ? "bg-white text-primary"
                    : "hover:bg-white text-white"
                }`}
              >
                <span className="text-xl">{component.icon}</span>
                <span className="ml-4 text-lg font-semibold">
                  {component.name}
                </span>

                {/* Circle Effects */}
                <span
                  className={`absolute right-0 -top-12 w-12 h-12 bg-transparent rounded-full shadow-[35px_35px_0_10px_white]
                  transition-opacity duration-100
                  ${
                    activeC === component.value
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                ></span>
                <span
                  className={`absolute right-0 -bottom-12 w-12 h-12 bg-transparent rounded-full shadow-[35px_-35px_0_10px_white]
                  transition-opacity duration-100
                  ${
                    activeC === component.value
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                ></span>
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
