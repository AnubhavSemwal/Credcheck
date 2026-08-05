import React from "react";
import { Bell, Search, PlusCircle } from "lucide-react";
import "../../styles/header.css";

const Header = ({ userName, onUpload }) => {
  return (
    <div className="dashboard-header">

      {/* Left */}

      <div>

        <h1>
          Welcome back, {userName} 👋
        </h1>

        <p>
          Manage and verify all your certificates in one place.
        </p>

      </div>

      {/* Right */}

      <div className="header-right">

        <div className="search-box">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search certificates..."
          />

        </div>

        <button className="notification-btn">

          <Bell size={20} />

        </button>

        <button
          className="upload-btn"
          onClick={onUpload}
        >

          <PlusCircle size={20} />

          Upload

        </button>

      </div>

    </div>
  );
};

export default Header;