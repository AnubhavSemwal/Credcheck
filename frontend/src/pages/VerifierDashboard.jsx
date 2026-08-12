import React, { useEffect, useMemo, useState } from "react";
import "./VerifierDashboard.css";

const VerifierDashboard = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const [selectedCertificate, setSelectedCertificate] =
    useState(null);

  const [comments, setComments] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [filter, setFilter] = useState("all");


  // ==========================================
  // FETCH PENDING CERTIFICATES
  // ==========================================

  const fetchCertificates = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/verifier/pending-certificates`,
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`,
          },
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

      alert(
        error.message ||
          "Failed to fetch certificates"
      );

    } finally {
      setLoading(false);
    }
  };


  // ==========================================
  // LOAD CERTIFICATES
  // ==========================================

  useEffect(() => {
    fetchCertificates();
  }, []);


  // ==========================================
  // APPROVE / REJECT CERTIFICATE
  // ==========================================

  const updateStatus = async (
    id,
    status
  ) => {

    try {

      setActionLoading(id);

      const token =
        localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/verifier/certificates/${id}/status`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            status,
            comments,
          }),
        }
      );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data.message ||
            "Failed to update certificate"
        );

      }


      alert(
        status === "approved"
          ? "Certificate approved successfully!"
          : "Certificate rejected successfully!"
      );


      // Close modal

      setSelectedCertificate(null);

      setComments("");


      // Refresh dashboard

      await fetchCertificates();


    } catch (error) {

      console.error(
        "Update status error:",
        error
      );

      alert(
        error.message ||
          "Failed to update certificate"
      );

    } finally {

      setActionLoading(null);

    }

  };


  // ==========================================
  // OPEN MODAL
  // ==========================================

  const openModal = (
    certificate,
    status
  ) => {

    setSelectedCertificate({
      ...certificate,
      action: status,
    });

    setComments("");

  };


  // ==========================================
  // CLOSE MODAL
  // ==========================================

  const closeModal = () => {

    setSelectedCertificate(null);

    setComments("");

  };


  // ==========================================
  // SEARCH + FILTER
  // ==========================================

  const filteredCertificates =
    useMemo(() => {

      return certificates.filter(
        (certificate) => {

          const search =
            searchTerm
              .toLowerCase()
              .trim();


          const matchesSearch =
            !search ||
            certificate.title
              ?.toLowerCase()
              .includes(search) ||
            certificate.organization
              ?.toLowerCase()
              .includes(search) ||
            certificate.student?.name
              ?.toLowerCase()
              .includes(search) ||
            certificate.student?.email
              ?.toLowerCase()
              .includes(search);


          const matchesFilter =
            filter === "all" ||
            certificate.status === filter;


          return (
            matchesSearch &&
            matchesFilter
          );

        }
      );

    }, [
      certificates,
      searchTerm,
      filter,
    ]);


  // ==========================================
  // STATISTICS
  // ==========================================

  const totalCertificates =
    certificates.length;


  const pendingCertificates =
    certificates.filter(
      (certificate) =>
        certificate.status ===
          "pending" ||
        !certificate.status
    ).length;


  const approvedCertificates =
    certificates.filter(
      (certificate) =>
        certificate.status ===
        "approved"
    ).length;


  const rejectedCertificates =
    certificates.filter(
      (certificate) =>
        certificate.status ===
        "rejected"
    ).length;


  // ==========================================
  // LOADING SCREEN
  // ==========================================

  if (loading) {

    return (

      <div className="verifier-page">

        <div className="verifier-loading">

          <div className="loading-spinner"></div>

          <h2>
            Loading verification requests...
          </h2>

          <p>
            Please wait while we fetch
            pending certificates.
          </p>

        </div>

      </div>

    );

  }


  // ==========================================
  // DASHBOARD
  // ==========================================

  return (

    <div className="verifier-page">


      {/* ======================================
          HERO HEADER
      ====================================== */}

      <section className="verifier-hero">

        <div className="hero-left">

          <span className="hero-badge">

            <i className="bi bi-shield-check"></i>

            CredCheck Verification Center

          </span>


          <h1>

            Welcome, Verifier 👋

          </h1>


          <p>

            Review student achievements and
            verify certificates with confidence.

          </p>

        </div>


        <div className="hero-right">

          <div className="hero-shield">

            <i className="bi bi-patch-check-fill"></i>

          </div>

        </div>

      </section>


      {/* ======================================
          STATISTICS
      ====================================== */}

      <section className="verifier-stats">


        {/* TOTAL */}

        <div className="verifier-stat-card stat-blue">

          <div className="stat-card-top">

            <div className="stat-icon">

              <i className="bi bi-files"></i>

            </div>

            <span className="stat-status">

              All

            </span>

          </div>


          <div className="stat-content">

            <span>
              Total Requests
            </span>

            <strong>
              {totalCertificates}
            </strong>

          </div>

        </div>


        {/* PENDING */}

        <div className="verifier-stat-card stat-orange">

          <div className="stat-card-top">

            <div className="stat-icon">

              <i className="bi bi-clock-history"></i>

            </div>

            <span className="stat-status">

              Action

            </span>

          </div>


          <div className="stat-content">

            <span>
              Pending Review
            </span>

            <strong>
              {pendingCertificates}
            </strong>

          </div>

        </div>


        {/* APPROVED */}

        <div className="verifier-stat-card stat-green">

          <div className="stat-card-top">

            <div className="stat-icon">

              <i className="bi bi-check-circle-fill"></i>

            </div>

            <span className="stat-status">

              Verified

            </span>

          </div>


          <div className="stat-content">

            <span>
              Approved
            </span>

            <strong>
              {approvedCertificates}
            </strong>

          </div>

        </div>


        {/* REJECTED */}

        <div className="verifier-stat-card stat-red">

          <div className="stat-card-top">

            <div className="stat-icon">

              <i className="bi bi-x-circle-fill"></i>

            </div>

            <span className="stat-status">

              Rejected

            </span>

          </div>


          <div className="stat-content">

            <span>
              Rejected
            </span>

            <strong>
              {rejectedCertificates}
            </strong>

          </div>

        </div>


      </section>


      {/* ======================================
          REQUESTS SECTION
      ====================================== */}

      <section className="requests-section">


        {/* HEADER */}

        <div className="section-header">

          <div>

            <span className="section-label">

              <i className="bi bi-clipboard-check"></i>

              VERIFICATION REQUESTS

            </span>


            <h2>

              Review Certificates

            </h2>


            <p>

              Verify certificates submitted
              by students.

            </p>

          </div>


          <button
            className="refresh-btn"
            onClick={fetchCertificates}
          >

            <i className="bi bi-arrow-clockwise"></i>

            Refresh

          </button>

        </div>


        {/* ======================================
            SEARCH + FILTER
        ====================================== */}

        <div className="request-toolbar">


          <div className="search-box">

            <i className="bi bi-search"></i>

            <input
              type="text"
              placeholder="Search student, certificate or organization..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(
                  e.target.value
                )
              }
            />

            {searchTerm && (

              <button
                className="clear-search"
                onClick={() =>
                  setSearchTerm("")
                }
              >

                <i className="bi bi-x"></i>

              </button>

            )}

          </div>


          <div className="filter-buttons">

            <button
              className={
                filter === "all"
                  ? "filter-btn active"
                  : "filter-btn"
              }
              onClick={() =>
                setFilter("all")
              }
            >

              All

            </button>


            <button
              className={
                filter === "pending"
                  ? "filter-btn active"
                  : "filter-btn"
              }
              onClick={() =>
                setFilter("pending")
              }
            >

              <i className="bi bi-clock"></i>

              Pending

            </button>

          </div>

        </div>


        {/* ======================================
            EMPTY STATE
        ====================================== */}

        {certificates.length === 0 ? (

          <div className="empty-state">

            <div className="empty-icon">

              <i className="bi bi-shield-check"></i>

            </div>


            <h3>

              All caught up! 🎉

            </h3>


            <p>

              There are currently no pending
              certificates waiting for verification.

            </p>


            <button
              className="empty-refresh-btn"
              onClick={fetchCertificates}
            >

              <i className="bi bi-arrow-clockwise"></i>

              Check Again

            </button>

          </div>

        ) : filteredCertificates.length === 0 ? (

          <div className="empty-state">

            <div className="empty-icon">

              <i className="bi bi-search"></i>

            </div>


            <h3>

              No matching certificates

            </h3>


            <p>

              Try changing your search or filter.

            </p>


            <button
              className="empty-refresh-btn"
              onClick={() => {

                setSearchTerm("");

                setFilter("all");

              }}
            >

              Clear Filters

            </button>

          </div>

        ) : (


          /* ====================================
             CERTIFICATE LIST
          ==================================== */

          <div className="request-list">


            {filteredCertificates.map(
              (certificate) => (

                <article
                  className="request-card"
                  key={
                    certificate._id
                  }
                >


                  {/* CARD ICON */}

                  <div className="certificate-icon">

                    <i className="bi bi-file-earmark-check-fill"></i>

                  </div>


                  {/* DETAILS */}

                  <div className="certificate-details">


                    <div className="certificate-heading">

                      <span className="request-status">

                        <span className="status-dot"></span>

                        Pending Review

                      </span>

                      <h3>

                        {certificate.title}

                      </h3>

                    </div>


                    <p className="organization">

                      <i className="bi bi-building"></i>

                      {certificate.organization}

                    </p>


                    <div className="student-info">


                      <span>

                        <i className="bi bi-person-circle"></i>

                        {certificate.student?.name ||
                          "Unknown Student"}

                      </span>


                      <span>

                        <i className="bi bi-envelope"></i>

                        {certificate.student?.email ||
                          "No email"}

                      </span>

                    </div>


                    <p className="issue-date">

                      <i className="bi bi-calendar3"></i>

                      Issued on{" "}

                      {certificate.issueDate
                        ? new Date(
                            certificate.issueDate
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              day:
                                "2-digit",

                              month:
                                "short",

                              year:
                                "numeric",
                            }
                          )
                        : "N/A"}

                    </p>

                  </div>


                  {/* ACTIONS */}

                  <div className="request-actions">


                    <a
                      href={
                        certificate.fileUrl
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="view-btn"
                    >

                      <i className="bi bi-eye"></i>

                      View

                    </a>


                    <button
                      className="approve-btn"
                      onClick={() =>
                        openModal(
                          certificate,
                          "approved"
                        )
                      }
                    >

                      <i className="bi bi-check-lg"></i>

                      Approve

                    </button>


                    <button
                      className="reject-btn"
                      onClick={() =>
                        openModal(
                          certificate,
                          "rejected"
                        )
                      }
                    >

                      <i className="bi bi-x-lg"></i>

                      Reject

                    </button>


                  </div>


                </article>

              )
            )}

          </div>

        )}

      </section>


      {/* ======================================
          APPROVE / REJECT MODAL
      ====================================== */}

      {selectedCertificate && (

        <div
          className="modal-overlay"
          onClick={(e) => {

            if (
              e.target ===
              e.currentTarget
            ) {

              closeModal();

            }

          }}
        >

          <div className="verification-modal">


            {/* CLOSE */}

            <button
              className="modal-close"
              onClick={closeModal}
            >

              <i className="bi bi-x-lg"></i>

            </button>


            {/* ICON */}

            <div
              className={
                selectedCertificate.action ===
                "approved"
                  ? "modal-icon approve-icon"
                  : "modal-icon reject-icon"
              }
            >

              <i
                className={
                  selectedCertificate.action ===
                  "approved"
                    ? "bi bi-check-lg"
                    : "bi bi-x-lg"
                }
              ></i>

            </div>


            <h2>

              {selectedCertificate.action ===
              "approved"
                ? "Approve Certificate?"
                : "Reject Certificate?"}

            </h2>


            <p>

              You are about to{" "}

              <strong>

                {selectedCertificate.action ===
                "approved"
                  ? "approve"
                  : "reject"}

              </strong>{" "}

              this certificate.

            </p>


            {/* SELECTED CERTIFICATE */}

            <div className="selected-certificate">

              <div className="selected-icon">

                <i className="bi bi-award-fill"></i>

              </div>


              <div>

                <strong>

                  {selectedCertificate.title}

                </strong>

                <span>

                  <i className="bi bi-person"></i>

                  {selectedCertificate
                    .student?.name ||
                    "Unknown Student"}

                </span>

              </div>

            </div>


            {/* COMMENTS */}

            <div className="comment-group">

              <label>

                <i className="bi bi-chat-left-text"></i>

                Verification Comments

                <span>
                  Optional
                </span>

              </label>


              <textarea
                value={
                  comments
                }
                onChange={(e) =>
                  setComments(
                    e.target.value
                  )
                }
                placeholder={
                  selectedCertificate.action ===
                  "approved"
                    ? "Add a verification comment..."
                    : "Explain why this certificate is rejected..."
                }
                rows="4"
              />

            </div>


            {/* MODAL ACTIONS */}

            <div className="modal-actions">


              <button
                className="cancel-btn"
                onClick={closeModal}
                disabled={
                  actionLoading ===
                  selectedCertificate._id
                }
              >

                Cancel

              </button>


              <button
                className={
                  selectedCertificate.action ===
                  "approved"
                    ? "confirm-approve-btn"
                    : "confirm-reject-btn"
                }
                disabled={
                  actionLoading ===
                  selectedCertificate._id
                }
                onClick={() =>
                  updateStatus(
                    selectedCertificate._id,
                    selectedCertificate.action
                  )
                }
              >

                {actionLoading ===
                selectedCertificate._id ? (

                  <>

                    <span className="button-spinner"></span>

                    Processing...

                  </>

                ) : (

                  selectedCertificate.action ===
                  "approved"
                    ? (
                      <>
                        <i className="bi bi-check-lg"></i>
                        Confirm Approval
                      </>
                    )
                    : (
                      <>
                        <i className="bi bi-x-lg"></i>
                        Confirm Rejection
                      </>
                    )

                )}

              </button>


            </div>


          </div>

        </div>

      )}

    </div>

  );

};


export default VerifierDashboard;