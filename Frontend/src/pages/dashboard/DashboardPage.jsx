import React, { Component, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import MainContent from "./MainContent";

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState(null)
 
  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <Sidebar setActiveComponent={setActiveComponent} />

      {/* Main section */}
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <Navbar />

        {/* Main content */}
        <MainContent activeComponent={activeComponent} />
      </div>
    </div>
  );
};

export default Dashboard;
