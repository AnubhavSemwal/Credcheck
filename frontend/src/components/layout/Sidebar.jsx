import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <aside className="dashboard-sidebar">

      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <i className="bi bi-shield-check"></i>
        </div>

        <div className="sidebar-logo-text">
          <strong>CredCheck</strong>
          <span>Certificate Verification</span>
        </div>
      </div>


      {/* Navigation */}
      <nav className="sidebar-navigation">

        <p className="sidebar-section-title">
          MAIN MENU
        </p>

        <NavLink
          to="/student-dashboard"
          className="sidebar-link"
        >
          <i className="bi bi-grid-1x2-fill"></i>
          <span>Dashboard</span>
        </NavLink>


        <NavLink
          to="/student-dashboard"
          className="sidebar-link"
        >
          <i className="bi bi-file-earmark-check"></i>
          <span>My Certificates</span>
        </NavLink>


        <NavLink
          to="/student-dashboard"
          className="sidebar-link"
        >
          <i className="bi bi-cloud-arrow-up"></i>
          <span>Upload Certificate</span>
        </NavLink>


        <p className="sidebar-section-title sidebar-second-title">
          ACCOUNT
        </p>


        <NavLink
          to="/student-dashboard"
          className="sidebar-link"
        >
          <i className="bi bi-person"></i>
          <span>My Profile</span>
        </NavLink>

      </nav>


      {/* Bottom */}
      <div className="sidebar-bottom">

        <div className="sidebar-help">
          <div className="help-icon">
            <i className="bi bi-question-circle"></i>
          </div>

          <div>
            <strong>Need Help?</strong>
            <span>Contact support</span>
          </div>
        </div>


        <button
          className="sidebar-logout"
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-right"></i>
          <span>Logout</span>
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;