import React from "react";
import {
  LayoutDashboard,
  Upload,
  FileText,
  User,
  LogOut,
  ShieldCheck
} from "lucide-react";

import "../../styles/sidebar.css";

const Sidebar = ({ activeMenu, setActiveMenu }) => {

  // ==========================================
  // LOGOUT FUNCTION
  // ==========================================
  const handleLogout = () => {

    // Remove login token
    localStorage.removeItem("token");

    // Remove user data if stored
    localStorage.removeItem("user");

    // Go to login page
    window.location.href = "/login";
  };


  const menuItems = [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />
    },
    {
      id: "upload",
      title: "Upload Certificate",
      icon: <Upload size={20} />
    },
    {
      id: "certificates",
      title: "My Certificates",
      icon: <FileText size={20} />
    },
    {
      id: "profile",
      title: "Profile",
      icon: <User size={20} />
    }
  ];


  return (
    <aside className="sidebar">

      {/* ======================================
          LOGO
      ====================================== */}

      <div className="logo">

        <ShieldCheck
          size={38}
          className="logo-icon"
        />

        <div>
          <h2>CredCheck</h2>
          <span>Student Portal</span>
        </div>

      </div>


      {/* ======================================
          MENU
      ====================================== */}

      <div className="menu">

        {menuItems.map((item) => (

          <button
            key={item.id}
            className={
              activeMenu === item.id
                ? "menu-item active"
                : "menu-item"
            }
            onClick={() =>
              setActiveMenu(item.id)
            }
          >

            {item.icon}

            <span>
              {item.title}
            </span>

          </button>

        ))}

      </div>


      {/* ======================================
          BOTTOM SECTION
      ====================================== */}

      <div className="sidebar-bottom">

        {/* STUDENT INFO */}

        <div className="student-card">

          <div className="avatar">
            A
          </div>

          <div>

            <h4>
              Ankit Singh
            </h4>

            <span>
              Student
            </span>

          </div>

        </div>


        {/* LOGOUT BUTTON */}

        <button
          className="logout-btn"
          onClick={handleLogout}
        >

          <LogOut size={20} />

          <span>
            Logout
          </span>

        </button>

      </div>

    </aside>
  );
};

export default Sidebar;