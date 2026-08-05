import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

import "../../styles/dashboard.css";

const DashboardLayout = ({
  children,
  userName = "Ankit",
  onUpload,
  onMenuChange
}) => {

  const [activeMenu, setActiveMenu] =
    useState("dashboard");


  // ==========================================
  // HANDLE SIDEBAR MENU CLICK
  // ==========================================

  const handleMenuChange = (menu) => {

    // Update active sidebar item
    setActiveMenu(menu);

    // Send selected menu to parent
    if (onMenuChange) {
      onMenuChange(menu);
    }

  };


  return (

    <div className="dashboard">

      {/* ======================================
          SIDEBAR
      ====================================== */}

      <Sidebar
        activeMenu={activeMenu}
        setActiveMenu={handleMenuChange}
      />


      {/* ======================================
          MAIN CONTENT
      ====================================== */}

      <div className="dashboard-main">

        <Header
          userName={userName}
          onUpload={onUpload}
        />


        <div className="dashboard-content">

          {children}

        </div>

      </div>

    </div>

  );

};

export default DashboardLayout;