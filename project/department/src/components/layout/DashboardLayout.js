import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div style={{ display: "flex" }}>
      
      <Sidebar />

      <div style={{  width: "100%" }}>
        
        <Navbar />

        <div style={{ padding: "30px", background: "#F4F6F8", minHeight: "100vh" }}>
          {children}
        </div>

      </div>

    </div>
  );
};

export default DashboardLayout;