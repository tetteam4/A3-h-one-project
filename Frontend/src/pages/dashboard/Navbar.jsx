import React, { useState, useEffect } from "react";
import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";

const Navbar = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [dateNumber, setDateNumber] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    const date = new Date();
    setDay(date.toLocaleDateString("en-US", { weekday: "long" }));
    setMonth(date.toLocaleDateString("en-US", { month: "long" }));
    setDateNumber(date.getDate());
    setYear(date.getFullYear());
  }, []);

  return (
    <div className="bg-white text-gray-800 py-3 px-6 flex items-center justify-between shadow-md ">
      {/* Left: Search Box */}
      <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full shadow-sm w-[350px]">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="ml-3 bg-transparent outline-none w-full text-gray-700 placeholder-gray-500"
        />
      </div>

      {/* Date Display */}
      <div className="hidden md:flex flex-col text-center text-gray-600">
        <span className="text-sm font-semibold">
          {day}, {month} {dateNumber}, {year}
        </span>
      </div>

      {/* Right: Icons & Profile */}
      <div className="flex items-center gap-6">
        <FaBell className="text-xl cursor-pointer text-gray-600 hover:text-blue-600 transition duration-300" />
        <MdOutlineMessage className="text-xl cursor-pointer text-gray-600 hover:text-blue-600 transition duration-300" />

        {/* Profile */}
        <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition duration-300">
          <FaUserCircle className="text-2xl" />
          <span className="text-sm font-medium hidden sm:block">
            Mohammad Anwar
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
