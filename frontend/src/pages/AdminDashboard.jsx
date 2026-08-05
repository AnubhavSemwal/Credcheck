import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";



const AdminDashboard = () => {

  // ==========================================
  // ADMIN STATISTICS
  // ==========================================

  const [stats, setStats] = useState({
    totalStudents: 0,
    totalVerifiers: 0,
    totalCertificates: 0,
    pendingCertificates: 0,
    approvedCertificates: 0,
    rejectedCertificates: 0
  });


  // ==========================================
  // STUDENTS
  // ==========================================

  const [students, setStudents] = useState([]);
  const [showStudents, setShowStudents] = useState(false);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [studentSearch, setStudentSearch] = useState("");
  


  // ==========================================
  // VERIFIERS
  // ==========================================

  const [verifiers, setVerifiers] = useState([]);
  const [showVerifiers, setShowVerifiers] = useState(false);
  const [verifiersLoading, setVerifiersLoading] = useState(false);
  const [verifierSearch, setVerifierSearch] = useState("");


  // ==========================================
  // VERIFIER REQUESTS
  // ==========================================

  const [verifierRequests, setVerifierRequests] = useState([]);
  const [showVerifierRequests, setShowVerifierRequests] = useState(false);
  const [verifierRequestsLoading, setVerifierRequestsLoading] = useState(false);
  const [verifierRequestSearch, setVerifierRequestSearch] = useState("");
  const [verifierRequestStatus, setVerifierRequestStatus] = useState("all");


  // ==========================================
  // CERTIFICATES
  // ==========================================

  const [certificates, setCertificates] = useState([]);
  const [showCertificates, setShowCertificates] = useState(false);
  const [certificatesLoading, setCertificatesLoading] = useState(false);
  const [certificateSearch, setCertificateSearch] = useState("");
  const [certificateStatus, setCertificateStatus] = useState("all");

//abusereport

  const [reports, setReports] = useState([]);
  const [showReports, setShowReports] = useState(false);
  const [reportsLoading, setReportsLoading] = useState(false);







  // ==========================================
  // GENERAL LOADING
  // ==========================================

  const [loading, setLoading] = useState(true);


  // ==========================================
  // GET TOKEN
  // ==========================================

  const getToken = () => {
    return localStorage.getItem("token");
  };


  // ==========================================
  // FETCH ADMIN STATISTICS
  // ==========================================

  const fetchStats = async () => {

    try {

      setLoading(true);

      const token = getToken();

      const response = await fetch(
        "http://localhost:5000/api/admin/stats",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Failed to fetch statistics"
        );
      }

      setStats(data.stats);

    } catch (error) {

      console.error(
        "Fetch admin stats error:",
        error
      );

      alert(error.message);

    } finally {

      setLoading(false);

    }

  };
 
  // ==========================================
// DELETE USER
// ==========================================

const deleteUser = async (userId) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this user?"
  );

  if (!confirmDelete) {
    return;
  }

  try {

    const token = getToken();

    const response = await fetch(
      `http://localhost:5000/api/admin/users/${userId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to delete user"
      );
    }

    alert("User deleted successfully.");

    // Refresh student list
    await fetchStudents();

    // Refresh verifier list
    await fetchVerifiers();

    // Refresh dashboard statistics
    await fetchStats();

  } catch (error) {

    console.error(
      "Delete user error:",
      error
    );

    alert(error.message);

  }

};

     // ==========================================
// BLOCK / UNBLOCK USER
// ==========================================

const toggleBlockUser = async (userId) => {

  try {

    const token = getToken();

    const response = await fetch(
      `http://localhost:5000/api/admin/users/${userId}/block`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
        "Failed to update user status"
      );
    }

    alert(data.message);

    // Refresh both lists
    await fetchStudents();
    await fetchVerifiers();

  } catch (error) {

    console.error(
      "Toggle block user error:",
      error
    );

    alert(error.message);

  }

};


  // ==========================================
  // FETCH STUDENTS
  // ==========================================

  const fetchStudents = async () => {

    try {

      setStudentsLoading(true);

      const token = getToken();

      const response = await fetch(
        "http://localhost:5000/api/admin/students",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Failed to fetch students"
        );
      }

      setStudents(
        data.students || []
      );

    } catch (error) {

      console.error(
        "Fetch students error:",
        error
      );

      alert(error.message);

    } finally {

      setStudentsLoading(false);

    }

  };


  // ==========================================
  // FETCH VERIFIERS
  // ==========================================

  const fetchVerifiers = async () => {

    try {

      setVerifiersLoading(true);

      const token = getToken();

      const response = await fetch(
        "http://localhost:5000/api/admin/verifiers",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Failed to fetch verifiers"
        );
      }

      setVerifiers(
        data.verifiers || []
      );

    } catch (error) {

      console.error(
        "Fetch verifiers error:",
        error
      );

      alert(error.message);

    } finally {

      setVerifiersLoading(false);

    }

  };


  // ==========================================
  // FETCH VERIFIER REQUESTS
  // ==========================================

  const fetchVerifierRequests = async () => {

    try {

      setVerifierRequestsLoading(true);

      const token = getToken();

      const response = await fetch(
        "http://localhost:5000/api/verifier-requests",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Failed to fetch verifier requests"
        );
      }

      setVerifierRequests(
        data.verifierRequests || []
      );

    } catch (error) {

      console.error(
        "Fetch verifier requests error:",
        error
      );

      alert(error.message);

    } finally {

      setVerifierRequestsLoading(false);

    }

  };
  
  
  
  // ==========================================
// FETCH ABUSE REPORTS
// ==========================================

const fetchReports = async () => {

  try {

    setReportsLoading(true);

    const token = getToken();

    const response = await fetch(
      "http://localhost:5000/api/abuse-reports",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
        "Failed to fetch reports"
      );
    }

    setReports(
      data.reports || []
    );

  } catch (error) {

    console.error(
      "Fetch reports error:",
      error
    );

    alert(error.message);

  } finally {

    setReportsLoading(false);

  }

};
// ==========================================
// RESOLVE ABUSE REPORT
// ==========================================

const resolveReport = async (reportId) => {

  try {

    const token = localStorage.getItem("token");

    const response = await fetch(

      `http://localhost:5000/api/abuse-reports/${reportId}/resolve`,

      {

        method: "PUT",

        headers: {

          Authorization: `Bearer ${token}`

        }

      }

    );

    const data = await response.json();

    if (!response.ok) {

      throw new Error(data.message);

    }

    alert("Report resolved successfully.");

    fetchReports();

  }

  catch (error) {

    alert(error.message);

  }

};





  // ==========================================
  // UPDATE VERIFIER REQUEST STATUS
  // ==========================================

  const updateVerifierRequestStatus = async (
  requestId,
  status
) => {
  try {
    const token = getToken();

    const response = await fetch(
      `http://localhost:5000/api/verifier-requests/${requestId}/status`,
      {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },

        body: JSON.stringify({
          status
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
        `Failed to ${status} verifier request`
      );
    }

    alert(
      `Verifier request ${status} successfully`
    );

    // Refresh verifier requests
    await fetchVerifierRequests();

    // Refresh admin statistics
    await fetchStats();

    // Refresh verifier list
    await fetchVerifiers();

  } catch (error) {
    console.error(
      "Update verifier request error:",
      error
    );

    alert(error.message);
  }
};

    // ==========================================
// TOGGLE TRUSTED ORGANIZATION
// ==========================================

   const toggleTrustedOrganization = async (certificateId) => {

     try {

        const token = localStorage.getItem("token");

          const response = await fetch(

             `http://localhost:5000/api/admin/certificates/${certificateId}/trusted`,

        {

          method: "PUT",

          headers: {

          Authorization: `Bearer ${token}`

        }

      }

    );

    const data = await response.json();

    if (!response.ok) {

      throw new Error(data.message);

    }

    alert(data.message);

    fetchCertificates();

  }

  catch (error) {

    alert(error.message);

  }
 
  };


   // ==========================================
  // FETCH CERTIFICATES
  // ==========================================

  const fetchCertificates = async () => {
    

    try {

      setCertificatesLoading(true);

      const token = getToken();

      const response = await fetch(
        "http://localhost:5000/api/admin/certificates",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Failed to fetch certificates"
        );
      }

      setCertificates(
        data.certificates || []
      );

    } catch (error) {

      console.error(
        "Fetch certificates error:",
        error
      );

      alert(error.message);

    } finally {

      setCertificatesLoading(false);

    }

  };


  // ==========================================
  // OPEN STUDENTS
  // ==========================================

  const handleManageStudents = () => {

    setShowStudents(true);
    setShowVerifiers(false);
    setShowVerifierRequests(false);
    setShowCertificates(false);

    fetchStudents();

  };


  // ==========================================
  // CLOSE STUDENTS
  // ==========================================

  const handleCloseStudents = () => {

    setShowStudents(false);
    setStudentSearch("");

  };


  // ==========================================
  // OPEN VERIFIERS
  // ==========================================

  const handleManageVerifiers = () => {

    setShowVerifiers(true);
    setShowStudents(false);
    setShowVerifierRequests(false);
    setShowCertificates(false);

    fetchVerifiers();

  };


  // ==========================================
  // CLOSE VERIFIERS
  // ==========================================

  const handleCloseVerifiers = () => {

    setShowVerifiers(false);
    setVerifierSearch("");

  };


  // ==========================================
  // OPEN VERIFIER REQUESTS
  // ==========================================

  const handleManageVerifierRequests = () => {

    setShowVerifierRequests(true);
    setShowStudents(false);
    setShowVerifiers(false);
    setShowCertificates(false);

    fetchVerifierRequests();

  };


  // ==========================================
  // CLOSE VERIFIER REQUESTS
  // ==========================================

  const handleCloseVerifierRequests = () => {

    setShowVerifierRequests(false);
    setVerifierRequestSearch("");
    setVerifierRequestStatus("all");

  };


  // ==========================================
  // OPEN CERTIFICATES
  // ==========================================

  const handleManageCertificates = () => {

    setShowCertificates(true);
    setShowStudents(false);
    setShowVerifiers(false);
    setShowVerifierRequests(false);

    fetchCertificates();

  };


  // ==========================================
  // CLOSE CERTIFICATES
  // ==========================================

  const handleCloseCertificates = () => {

    setShowCertificates(false);
    setCertificateSearch("");
    setCertificateStatus("all");

  };
  
  
  // ==========================================
// OPEN ABUSE REPORTS
// ==========================================

const handleManageReports = () => {

  setShowReports(true);

  setShowStudents(false);
  setShowVerifiers(false);
  setShowVerifierRequests(false);
  setShowCertificates(false);

  fetchReports();

};


// ==========================================
// CLOSE ABUSE REPORTS
// ==========================================

const handleCloseReports = () => {

  setShowReports(false);

};


  // ==========================================
  // LOAD STATS
  // ==========================================

  useEffect(() => {

    fetchStats();

  }, []);


  // ==========================================
  // FILTER STUDENTS
  // ==========================================

  const filteredStudents =
    students.filter((student) => {

      const search =
        studentSearch
          .toLowerCase()
          .trim();

      return (
        student.name
          ?.toLowerCase()
          .includes(search)

        ||

        student.email
          ?.toLowerCase()
          .includes(search)

        ||

        student.college
          ?.toLowerCase()
          .includes(search)
      );

    });


  // ==========================================
  // FILTER VERIFIERS
  // ==========================================

  const filteredVerifiers =
    verifiers.filter((verifier) => {

      const search =
        verifierSearch
          .toLowerCase()
          .trim();

      return (
        verifier.name
          ?.toLowerCase()
          .includes(search)

        ||

        verifier.email
          ?.toLowerCase()
          .includes(search)

        ||

        verifier.college
          ?.toLowerCase()
          .includes(search)
      );

    });


  // ==========================================
  // FILTER VERIFIER REQUESTS
  // ==========================================

  const filteredVerifierRequests =
    verifierRequests.filter((request) => {

      const search =
        verifierRequestSearch
          .toLowerCase()
          .trim();

      const organizationName =
        request.organizationName
          ?.toLowerCase() || "";

      const email =
        request.email
          ?.toLowerCase() || "";

      const matchesSearch =
        organizationName.includes(search) ||
        email.includes(search);

      const matchesStatus =
        verifierRequestStatus === "all" ||
        request.status === verifierRequestStatus;

      return (
        matchesSearch &&
        matchesStatus
      );

    });


  // ==========================================
  // FILTER CERTIFICATES
  // ==========================================

  const filteredCertificates =
    certificates.filter((certificate) => {

      const search =
        certificateSearch
          .toLowerCase()
          .trim();

      const studentName =
        certificate.student?.name
          ?.toLowerCase() || "";

      const studentEmail =
        certificate.student?.email
          ?.toLowerCase() || "";

      const title =
        certificate.title
          ?.toLowerCase() || "";

      const organization =
        certificate.organization
          ?.toLowerCase() || "";

      const matchesSearch =
        studentName.includes(search) ||
        studentEmail.includes(search) ||
        title.includes(search) ||
        organization.includes(search);

      const matchesStatus =
        certificateStatus === "all" ||
        certificate.status === certificateStatus;

      return (
        matchesSearch &&
        matchesStatus
      );

    });


  // ==========================================
  // STATUS BADGE
  // ==========================================

  const getStatusClass = (status) => {

    if (status === "approved") {
      return "status-approved";
    }

    if (status === "rejected") {
      return "status-rejected";
    }

    return "status-pending";

  };


  // ==========================================
  // MAIN UI
  // ==========================================

  return (

    <div className="admin-dashboard">


      {/* ======================================
          HEADER
      ====================================== */}

      <div className="admin-header">

        <div>

          <span className="admin-label">

            <i className="bi bi-shield-lock-fill"></i>

            CREDcheck ADMIN PORTAL

          </span>

          <h1>
            Admin Dashboard
          </h1>

          <p>
            Monitor students, verifiers and
            certificate verification activity.
          </p>

        </div>


        <button
          className="admin-refresh-btn"
          onClick={fetchStats}
        >

          <i className="bi bi-arrow-clockwise"></i>

          Refresh

        </button>

      </div>


      {/* ======================================
          STATISTICS
      ====================================== */}

      {loading ? (

        <div className="admin-loading">

          <div className="admin-spinner"></div>

          <h3>
            Loading dashboard...
          </h3>

        </div>

      ) : (

        <div className="admin-stats-grid">


          {/* STUDENTS */}

          <div className="admin-stat-card blue">

            <div className="admin-stat-icon">
              <i className="bi bi-people-fill"></i>
            </div>

            <div>

              <span>
                Total Students
              </span>

              <strong>
                {stats.totalStudents}
              </strong>

            </div>

          </div>


          {/* VERIFIERS */}

          <div className="admin-stat-card purple">

            <div className="admin-stat-icon">
              <i className="bi bi-person-check-fill"></i>
            </div>

            <div>

              <span>
                Total Verifiers
              </span>

              <strong>
                {stats.totalVerifiers}
              </strong>

            </div>

          </div>


          {/* CERTIFICATES */}

          <div className="admin-stat-card cyan">

            <div className="admin-stat-icon">
              <i className="bi bi-file-earmark-text-fill"></i>
            </div>

            <div>

              <span>
                Total Certificates
              </span>

              <strong>
                {stats.totalCertificates}
              </strong>

            </div>

          </div>


          {/* PENDING */}

          <div className="admin-stat-card orange">

            <div className="admin-stat-icon">
              <i className="bi bi-clock-history"></i>
            </div>

            <div>

              <span>
                Pending
              </span>

              <strong>
                {stats.pendingCertificates}
              </strong>

            </div>

          </div>


          {/* APPROVED */}

          <div className="admin-stat-card green">

            <div className="admin-stat-icon">
              <i className="bi bi-check-circle-fill"></i>
            </div>

            <div>

              <span>
                Approved
              </span>

              <strong>
                {stats.approvedCertificates}
              </strong>

            </div>

          </div>


          {/* REJECTED */}

          <div className="admin-stat-card red">

            <div className="admin-stat-icon">
              <i className="bi bi-x-circle-fill"></i>
            </div>

            <div>

              <span>
                Rejected
              </span>

              <strong>
                {stats.rejectedCertificates}
              </strong>

            </div>

          </div>

        </div>

      )}


      {/* ======================================
          QUICK ACTIONS
      ====================================== */}

      <div className="admin-section">

        <div className="admin-section-header">

          <div>

            <span className="section-label">
              ADMIN MANAGEMENT
            </span>

            <h2>
              Quick Actions
            </h2>

            <p>
              Manage the CredCheck platform
              from one place.
            </p>

          </div>

        </div>


        <div className="admin-action-grid">


          {/* MANAGE STUDENTS */}

          <button
            className="admin-action-card"
            onClick={handleManageStudents}
          >

            <div className="action-icon blue">

              <i className="bi bi-people"></i>

            </div>

            <div>

              <h3>
                Manage Students
              </h3>

              <p>
                View all registered students.
              </p>

            </div>

            <i className="bi bi-arrow-right"></i>

          </button>


          {/* MANAGE VERIFIERS */}

          <button
            className="admin-action-card"
            onClick={handleManageVerifiers}
          >

            <div className="action-icon purple">

              <i className="bi bi-person-check"></i>

            </div>

            <div>

              <h3>
                Manage Verifiers
              </h3>

              <p>
                View all registered verifiers.
              </p>

            </div>

            <i className="bi bi-arrow-right"></i>

          </button>


          {/* MANAGE VERIFIER REQUESTS */}

          <button
            className="admin-action-card"
            onClick={handleManageVerifierRequests}
          >

            <div className="action-icon orange">

              <i className="bi bi-person-plus"></i>

            </div>

            <div>

              <h3>
                Verifier Requests
              </h3>

              <p>
                Approve or reject verifier applications.
              </p>

            </div>

            <i className="bi bi-arrow-right"></i>

          </button>


          {/* MANAGE CERTIFICATES */}

          <button
            className="admin-action-card"
            onClick={handleManageCertificates}
          >

            <div className="action-icon cyan">

              <i className="bi bi-file-earmark-check"></i>

            </div>

            <div>

              <h3>
                Manage Certificates
              </h3>

              <p>
                Review certificate submissions.
              </p>

            </div>

            <i className="bi bi-arrow-right"></i>

          </button>


        </div>

      </div>
       {/* MANAGE ABUSE REPORTS */}

<button
  className="admin-action-card"
  onClick={handleManageReports}
>

  <div className="action-icon red">

    <i className="bi bi-flag-fill"></i>

  </div>

  <div>

    <h3>
      Abuse Reports
    </h3>

    <p>
      View and resolve reported certificates.
    </p>

  </div>

  <i className="bi bi-arrow-right"></i>

</button>


      {/* ======================================
          STUDENTS MANAGEMENT
      ====================================== */}

      {showStudents && (

        <div className="admin-section students-section">

          <div className="admin-section-header">

            <div>

              <span className="section-label">

                <i className="bi bi-people-fill"></i>

                STUDENT MANAGEMENT

              </span>

              <h2>
                Registered Students
              </h2>

              <p>
                View all students registered
                on the CredCheck platform.
              </p>

            </div>


            <button
              className="admin-refresh-btn"
              onClick={fetchStudents}
            >

              <i className="bi bi-arrow-clockwise"></i>

              Refresh Students

            </button>

          </div>


          <div className="student-toolbar">

            <div className="student-search">

              <i className="bi bi-search"></i>

              <input
                type="text"
                placeholder="Search by name, email or college..."
                value={studentSearch}
                onChange={(e) =>
                  setStudentSearch(e.target.value)
                }
              />

            </div>


            <button
              className="close-students-btn"
              onClick={handleCloseStudents}
            >

              <i className="bi bi-x-lg"></i>

              Close

            </button>

          </div>


          {studentsLoading ? (

            <div className="admin-loading">

              <div className="admin-spinner"></div>

              <h3>
                Loading students...
              </h3>

            </div>

          ) : filteredStudents.length === 0 ? (

            <div className="admin-empty-state">

              <i className="bi bi-people"></i>

              <h3>
                No students found
              </h3>

              <p>
                There are no students matching
                your search.
              </p>

            </div>

          ) : (

            <div className="students-table-wrapper">

              <table className="students-table">

                <thead>

                  <tr>

                    <th>Student</th>
                    <th>Email</th>
                    <th>College</th>
                    <th>Degree</th>
                    <th>Batch</th>
                    <th>Joined</th>
                    <th>Actions</th>
                    


                  </tr>

                </thead>

                <tbody>

                  {filteredStudents.map(
                    (student) => (

                      <tr key={student._id}>

                        <td>

                          <div className="student-name-cell">

                            <div className="student-avatar">

                              {student.name
                                ?.charAt(0)
                                .toUpperCase()}

                            </div>

                            <strong>

                              {student.name ||
                                "Unknown"}

                            </strong>

                          </div>

                        </td>

                        <td>
                          {student.email}
                        </td>

                        <td>
                          {student.college || "N/A"}
                        </td>

                        <td>
                          {student.degree || "N/A"}
                        </td>

                        <td>
                          {student.batch || "N/A"}
                        </td>

                        <td>

                          {student.createdAt
                            ? new Date(
                                student.createdAt
                              ).toLocaleDateString(
                                "en-IN"
                              )
                            : "N/A"}

                        </td>
                        <td>

                           <button
                               className="delete-user-btn"
                               onClick={() =>
                               deleteUser(student._id)
                            }
                          >

                            <i className="bi bi-trash"></i>

                               Delete

                            </button>

                        </td>
                        <td>

                          <button
                            className="block-user-btn"
                            onClick={() => 
                              toggleBlockUser(student._id)
                            }
                          >

                            

                            {student.blocked 
                            ? "Unblock"
                             : "Block"
                             }

                          </button>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      )}


      {/* ======================================
          VERIFIERS MANAGEMENT
      ====================================== */}

      {showVerifiers && (

        <div className="admin-section students-section">

          <div className="admin-section-header">

            <div>

              <span className="section-label">

                <i className="bi bi-person-check-fill"></i>

                VERIFIER MANAGEMENT

              </span>

              <h2>
                Registered Verifiers
              </h2>

              <p>
                View all verifiers registered
                on the CredCheck platform.
              </p>

            </div>


            <button
              className="admin-refresh-btn"
              onClick={fetchVerifiers}
            >

              <i className="bi bi-arrow-clockwise"></i>

              Refresh Verifiers

            </button>

          </div>


          <div className="student-toolbar">

            <div className="student-search">

              <i className="bi bi-search"></i>

              <input
                type="text"
                placeholder="Search by name, email or college..."
                value={verifierSearch}
                onChange={(e) =>
                  setVerifierSearch(e.target.value)
                }
              />

            </div>


            <button
              className="close-students-btn"
              onClick={handleCloseVerifiers}
            >

              <i className="bi bi-x-lg"></i>

              Close

            </button>

          </div>


          {verifiersLoading ? (

            <div className="admin-loading">

              <div className="admin-spinner"></div>

              <h3>
                Loading verifiers...
              </h3>

            </div>

          ) : filteredVerifiers.length === 0 ? (

            <div className="admin-empty-state">

              <i className="bi bi-person-check"></i>

              <h3>
                No verifiers found
              </h3>

              <p>
                There are no verifiers matching
                your search.
              </p>

            </div>

          ) : (

            <div className="students-table-wrapper">

              <table className="students-table">

                <thead>

                  <tr>

                    <th>Verifier</th>
                    <th>Email</th>
                    <th>College</th>
                    <th>Degree</th>
                    <th>Batch</th>
                    <th>Joined</th>
                    <th>Actions</th>  

                  </tr>

                </thead>

                <tbody>

                  {filteredVerifiers.map(
                    (verifier) => (

                      <tr key={verifier._id}>

                        <td>

                          <div className="student-name-cell">

                            <div className="student-avatar">

                              {verifier.name
                                ?.charAt(0)
                                .toUpperCase()}

                            </div>

                            <strong>

                              {verifier.name ||
                                "Unknown"}

                            </strong>

                          </div>

                        </td>

                        <td>
                          {verifier.email}
                        </td>

                        <td>
                          {verifier.college || "N/A"}
                        </td>

                        <td>
                          {verifier.degree || "N/A"}
                        </td>

                        <td>
                          {verifier.batch || "N/A"}
                        </td>

                        <td>

                          {verifier.createdAt
                            ? new Date(
                                verifier.createdAt
                              ).toLocaleDateString(
                                "en-IN"
                              )
                            : "N/A"}

                        </td>
                        <td>

                          <button
                           className="delete-user-btn"
                           onClick={() =>
                            deleteUser(verifier._id)
                             }
                          >

                           <i className="bi bi-trash"></i>

                               Delete

                         </button>

                        </td>
                        <td>
                          <button
                              className="delete-user-btn"
                               onClick={() =>
                                toggleBlockUser(verifier._id)
                            }
                          >
                                 {verifier.blocked
                                   ? "Unblock"
                                : "Block"}
                          </button>
                        </td> 


                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      )}


      {/* ======================================
          VERIFIER REQUEST MANAGEMENT
      ====================================== */}

      {showVerifierRequests && (

        <div className="admin-section students-section">

          <div className="admin-section-header">

            <div>

              <span className="section-label">

                <i className="bi bi-person-plus-fill"></i>

                VERIFIER REQUEST MANAGEMENT

              </span>

              <h2>
                Verifier Applications
              </h2>

              <p>
                Review organizations requesting
                verifier access to CredCheck.
              </p>

            </div>


            <button
              className="admin-refresh-btn"
              onClick={fetchVerifierRequests}
            >

              <i className="bi bi-arrow-clockwise"></i>

              Refresh Requests

            </button>

          </div>


          {/* VERIFIER REQUEST TOOLBAR */}

          <div className="student-toolbar">

            <div className="student-search">

              <i className="bi bi-search"></i>

              <input
                type="text"
                placeholder="Search by organization or email..."
                value={verifierRequestSearch}
                onChange={(e) =>
                  setVerifierRequestSearch(
                    e.target.value
                  )
                }
              />

            </div>


            <select
              value={verifierRequestStatus}
              onChange={(e) =>
                setVerifierRequestStatus(
                  e.target.value
                )
              }
              className="certificate-status-filter"
            >

              <option value="all">
                All Status
              </option>

              <option value="pending">
                Pending
              </option>

              <option value="approved">
                Approved
              </option>

              <option value="rejected">
                Rejected
              </option>

            </select>


            <button
              className="close-students-btn"
              onClick={handleCloseVerifierRequests}
            >

              <i className="bi bi-x-lg"></i>

              Close

            </button>

          </div>


          {/* VERIFIER REQUEST CONTENT */}

          {verifierRequestsLoading ? (

            <div className="admin-loading">

              <div className="admin-spinner"></div>

              <h3>
                Loading verifier requests...
              </h3>

            </div>

          ) : filteredVerifierRequests.length === 0 ? (

            <div className="admin-empty-state">

              <i className="bi bi-person-plus"></i>

              <h3>
                No verifier requests found
              </h3>

              <p>
                There are no verifier requests
                matching your search or selected status.
              </p>

            </div>

          ) : (

            <div className="students-table-wrapper">

              <table className="students-table">

                <thead>

                  <tr>

                    <th>
                      Organization
                    </th>

                    <th>
                      Email
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Requested
                    </th>

                    <th>
                      Action
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {filteredVerifierRequests.map(
                    (request) => (

                      <tr
                        key={
                          request._id
                        }
                      >

                        {/* ORGANIZATION */}

                        <td>

                          <div className="student-name-cell">

                            <div className="student-avatar">

                              {request.organizationName
                                ?.charAt(0)
                                .toUpperCase()}

                            </div>

                            <strong>

                              {request.organizationName ||
                                "Unknown Organization"}

                            </strong>

                          </div>

                        </td>


                        {/* EMAIL */}

                        <td>

                          {request.email ||
                            "N/A"}

                        </td>


                        {/* STATUS */}

                        <td>

                          <span
                            className={`certificate-status ${getStatusClass(
                              request.status
                            )}`}
                          >

                            {request.status
                              ?.toUpperCase() ||
                              "PENDING"}

                          </span>

                        </td>


                        {/* REQUESTED DATE */}

                        <td>

                          {request.requestedAt
                            ? new Date(
                                request.requestedAt
                              ).toLocaleDateString(
                                "en-IN"
                              )
                            : request.createdAt
                            ? new Date(
                                request.createdAt
                              ).toLocaleDateString(
                                "en-IN"
                              )
                            : "N/A"}

                        </td>


                        {/* ACTIONS */}

                        <td>

                          {request.status === "pending" ? (

                            <div
                              style={{
                                display: "flex",
                                gap: "8px",
                                flexWrap: "wrap"
                              }}
                            >

                              <button
                                type="button"
                                className="admin-approve-btn"
                                onClick={() =>
                                  updateVerifierRequestStatus(
                                    request._id,
                                    "approved"
                                  )
                                }
                              >

                                <i className="bi bi-check-lg"></i>

                                Approve

                              </button>


                              <button
                                type="button"
                                className="admin-reject-btn"
                                onClick={() =>
                                  updateVerifierRequestStatus(
                                    request._id,
                                    "rejected"
                                  )
                                }
                              >

                                <i className="bi bi-x-lg"></i>

                                Reject

                              </button>

                            </div>

                          ) : (

                            <span>
                              No action required
                            </span>

                          )}

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      )}


      {/* ======================================
          CERTIFICATE MANAGEMENT
      ====================================== */}

      {showCertificates && (

        <div className="admin-section students-section">

          <div className="admin-section-header">

            <div>

              <span className="section-label">

                <i className="bi bi-file-earmark-check-fill"></i>

                CERTIFICATE MANAGEMENT

              </span>

              <h2>
                Certificate Submissions
              </h2>

              <p>
                Review all certificate submissions
                on the CredCheck platform.
              </p>

            </div>


            <button
              className="admin-refresh-btn"
              onClick={fetchCertificates}
            >

              <i className="bi bi-arrow-clockwise"></i>

              Refresh Certificates

            </button>

          </div>


          {/* CERTIFICATE TOOLBAR */}

          <div className="student-toolbar">

            <div className="student-search">

              <i className="bi bi-search"></i>

              <input
                type="text"
                placeholder="Search by student, email, title or organization..."
                value={certificateSearch}
                onChange={(e) =>
                  setCertificateSearch(
                    e.target.value
                  )
                }
              />

            </div>


            <select
              value={certificateStatus}
              onChange={(e) =>
                setCertificateStatus(
                  e.target.value
                )
              }
              className="certificate-status-filter"
            >

              <option value="all">
                All Status
              </option>

              <option value="pending">
                Pending
              </option>

              <option value="approved">
                Approved
              </option>

              <option value="rejected">
                Rejected
              </option>

            </select>


            <button
              className="close-students-btn"
              onClick={handleCloseCertificates}
            >

              <i className="bi bi-x-lg"></i>

              Close

            </button>

          </div>


          {/* CERTIFICATE CONTENT */}

          {certificatesLoading ? (

            <div className="admin-loading">

              <div className="admin-spinner"></div>

              <h3>
                Loading certificates...
              </h3>

            </div>

          ) : filteredCertificates.length === 0 ? (

            <div className="admin-empty-state">

              <i className="bi bi-file-earmark-text"></i>

              <h3>
                No certificates found
              </h3>

              <p>
                There are no certificates matching
                your search or selected status.
              </p>

            </div>

          ) : (

            <div className="students-table-wrapper">

              <table className="students-table">

                <thead>

                  <tr>

                    <th>
                      Certificate
                    </th>

                    <th>
                      Student
                    </th>

                    <th>
                      Organization
                    </th>

                    <th>
                      Verifier Email
                    </th>

                    <th>
                      Issue Date
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Submitted
                    </th>
                    <th>
                      Trusted</th>

                  </tr>

                </thead>


                <tbody>

                  {filteredCertificates.map(
                    (certificate) => (

                      <tr
                        key={
                          certificate._id
                        }
                      >

                        {/* CERTIFICATE */}

                        <td>

                          <strong>
                            {certificate.title ||
                              "Untitled Certificate"}
                          </strong>

                        </td>


                        {/* STUDENT */}

                        <td>

                          <div className="student-name-cell">

                            <div className="student-avatar">

                              {certificate.student?.name
                                ?.charAt(0)
                                .toUpperCase()}

                            </div>

                            <div>

                              <strong>

                                {certificate.student?.name ||
                                  "Unknown"}

                              </strong>

                              <small>

                                {certificate.student?.email ||
                                  "No email"}

                              </small>

                            </div>

                          </div>

                        </td>


                        {/* ORGANIZATION */}

                        <td>

                          {certificate.organization ||
                            "N/A"}

                        </td>


                        {/* VERIFIER EMAIL */}

                        <td>

                          {certificate.verifierEmail ||
                            "N/A"}

                        </td>


                        {/* ISSUE DATE */}

                        <td>

                          {certificate.issueDate
                            ? new Date(
                                certificate.issueDate
                              ).toLocaleDateString(
                                "en-IN"
                              )
                            : "N/A"}

                        </td>


                        {/* STATUS */}

                        <td>

                          <span
                            className={`certificate-status ${getStatusClass(
                              certificate.status
                            )}`}
                          >

                            {certificate.status
                              ?.toUpperCase() ||
                              "PENDING"}

                          </span>

                        </td>


                        {/* SUBMITTED */}

                        <td>

                          {certificate.createdAt
                            ? new Date(
                                certificate.createdAt
                              ).toLocaleDateString(
                                "en-IN"
                              )
                            : "N/A"}

                        </td>
                        <td>

                          <button
                              className="approve-btn"
                               onClick={() =>
                              toggleTrustedOrganization(certificate._id)
                            }
                          >

                           {certificate.trustedOrganization
                               ? "⭐ Trusted"
                               : "Trust"}

                          </button>

                         </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      )}
      {/* ==========================================
    ABUSE REPORT MANAGEMENT
========================================== */}

{showReports && (

  <div className="admin-section students-section">

    {/* HEADER */}

    <div className="admin-section-header">

      <div>

        <span className="section-label">

          <i className="bi bi-flag-fill"></i>

          ABUSE REPORT MANAGEMENT

        </span>

        <h2>
          Abuse Reports
        </h2>

        <p>
          Review and resolve reports submitted
          for suspicious or incorrect certificates.
        </p>

      </div>


      <button
        className="admin-refresh-btn"
        onClick={fetchReports}
      >

        <i className="bi bi-arrow-clockwise"></i>

        Refresh Reports

      </button>

    </div>


    {/* CLOSE BUTTON */}

    <div className="student-toolbar">

      <button
        className="close-students-btn"
        onClick={handleCloseReports}
      >

        <i className="bi bi-x-lg"></i>

        Close

      </button>

    </div>


    {/* LOADING */}

    {reportsLoading ? (

      <div className="admin-loading">

        <div className="admin-spinner"></div>

        <h3>
          Loading abuse reports...
        </h3>

      </div>

    ) : reports.length === 0 ? (

      /* EMPTY */

      <div className="admin-empty-state">

        <i className="bi bi-flag"></i>

        <h3>
          No abuse reports found
        </h3>

        <p>
          There are currently no abuse reports.
        </p>

      </div>

    ) : (

      /* REPORT TABLE */

      <div className="students-table-wrapper">

        <table className="students-table">

          <thead>

            <tr>

              <th>
                Certificate
              </th>

              <th>
                Organization
              </th>

              <th>
                Reason
              </th>

              <th>
                Reporter Email
              </th>

              <th>
                Status
              </th>

              <th>
                Reported
              </th>

              <th>
                Action
              </th>

            </tr>

          </thead>


          <tbody>

            {reports.map((report) => (

              <tr key={report._id}>

                {/* CERTIFICATE */}

                <td>

                  <strong>
                    {report.certificate?.title ||
                      "Unknown Certificate"}
                  </strong>

                </td>


                {/* ORGANIZATION */}

                <td>

                  {report.certificate?.organization ||
                    "N/A"}

                </td>


                {/* REASON */}

                <td>

                  {report.reason ||
                    "N/A"}

                </td>


                {/* REPORTER */}

                <td>

                  {report.reporterEmail ||
                    "Not provided"}

                </td>


                {/* STATUS */}

                <td>

                  <span
                    className={`certificate-status ${
                      report.status === "resolved"
                        ? "status-approved"
                        : "status-pending"
                    }`}
                  >

                    {report.status?.toUpperCase()}

                  </span>

                </td>


                {/* DATE */}

                <td>

                  {report.createdAt
                    ? new Date(
                        report.createdAt
                      ).toLocaleDateString(
                        "en-IN"
                      )
                    : "N/A"}

                </td>
                <td>
                  {report.status === "pending" ? (

                  <button
                    className="approve-btn"
                    onClick={() => resolveReport(report._id)}
                  >
                    resolve
                  </button>

                 ): (

                      <span
                         style={{
                           color: "green",
                           fontWeight: "bold"
                      }}
                     >

                          ✔ Resolved

                     </span>

                 )}

                </td> 

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    )}

  </div>

)}

    </div>

  );

};

export default AdminDashboard; 