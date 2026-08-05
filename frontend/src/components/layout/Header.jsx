import "./Header.css";

function Header({
  title = "Student Dashboard",
  subtitle = "Manage your certificates and verification status",
  userName = "Student",
}) {
  const firstLetter = userName
    ? userName.charAt(0).toUpperCase()
    : "S";

  return (
    <header className="dashboard-header">

      <div className="header-title-area">

        <div className="header-breadcrumb">
          <span>CredCheck</span>
          <i className="bi bi-chevron-right"></i>
          <strong>Dashboard</strong>
        </div>

        <h1>{title}</h1>

        <p>{subtitle}</p>

      </div>


      <div className="header-actions">

        {/* Notification */}
        <button className="notification-button">
          <i className="bi bi-bell"></i>

          <span className="notification-badge">
            2
          </span>
        </button>


        {/* Profile */}
        <div className="header-profile">

          <div className="profile-avatar">
            {firstLetter}
          </div>

          <div className="profile-details">
            <strong>{userName}</strong>
            <span>Student Account</span>
          </div>

          <i className="bi bi-chevron-down profile-arrow"></i>

        </div>

      </div>

    </header>
  );
}

export default Header;