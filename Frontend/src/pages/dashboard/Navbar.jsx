import React, { useState, useEffect } from "react";
import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { signOutSuccess } from "../../state/userSlice/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [dateNumber, setDateNumber] = useState("");
  const [year, setYear] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const date = new Date();
    setDay(date.toLocaleDateString("en-US", { weekday: "long" }));
    setMonth(date.toLocaleDateString("en-US", { month: "long" }));
    setDateNumber(date.getDate());
    setYear(date.getFullYear());
  }, []);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    dispatch(signOutSuccess());
    navigate("/sign-in");
  };

  return (
    <div className="bg-white text-gray-800 py-3 px-6 flex items-center justify-between shadow-md ">
      <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full shadow-sm w-[350px]">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="ml-3 bg-transparent outline-none w-full text-gray-700 placeholder-gray-500"
        />
      </div>

      <div className="hidden md:flex flex-col text-center text-gray-600">
        <span className="text-sm font-semibold">
          {day}, {month} {dateNumber}, {year}
        </span>
      </div>

      <div className="flex items-center gap-6">
        <FaBell className="text-2xl cursor-pointer text-primary hover:text-primary transition duration-300" />
        <MdOutlineMessage className="text-2xl cursor-pointer text-primary hover:text-primary transition duration-300" />

        <div
          className="flex items-center gap-2 cursor-pointer text-primary transition duration-300 relative"
          onClick={toggleProfile}
        >
          {currentUser?.profile_picture ? (
            <img
              src={currentUser.profile_picture}
              alt="User Avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <FaUserCircle className="text-3xl" />
          )}
          <span className="text-sm font-medium hidden sm:block">
            {currentUser
              ? `${currentUser.first_name ?? ""} ${currentUser.last_name ?? ""}`
              : "Loading..."}
          </span>

          {isProfileOpen && (
            <div className="absolute right-0 mt-10 w-48 bg-white rounded-md shadow-xl z-10">
              <div className="py-1">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </a>
                <Link
                  to="setting"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left w-full"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
