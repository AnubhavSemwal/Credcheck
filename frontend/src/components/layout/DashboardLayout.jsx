import Sidebar from "./Sidebar";
import Header from "./Header";
import "./DashboardLayout.css";

function DashboardLayout({
  children,
  title = "Student Dashboard",
  subtitle = "Manage and verify your certificates",
  userName = "Student",
}) {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <Header
          title={title}
          subtitle={subtitle}
          userName={userName}
        />

        <div className="dashboard-content">
          {children}
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;