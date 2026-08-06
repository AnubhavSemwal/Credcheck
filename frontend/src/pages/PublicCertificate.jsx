import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PublicCertificate.css";

const PublicCertificate = () => {
  const { publicLinkId } = useParams();

  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showReportModal, setShowReportModal] = useState(false);
  const [reason, setReason] = useState("");


  // ======================================
// REPORT CERTIFICATE
// ======================================

const submitReport = async () => {
  if (!reason.trim()) {
    alert("Please enter a reason.");
    return;
  }

  try {
    const response = await fetch(
  `${import.meta.env.VITE_API_URL}/api/abuse-reports`,
  
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          certificateId: certificate._id,
          reason,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    alert("Report submitted successfully.");

    setReason("");
    setShowReportModal(false);
  } catch (error) {
    alert(error.message);
  }
};

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/certificates/public/${publicLinkId}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Certificate not found"
          );
        }

        setCertificate(data.certificate);
      } catch (error) {
        console.error("Certificate verification error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (publicLinkId) {
      fetchCertificate();
    }
  }, [publicLinkId]);

  // ==============================
  // LOADING
  // ==============================

  if (loading) {
    return (
      <div className="public-page">
        <div className="public-loading">
          <div className="public-spinner"></div>

          <h2>Verifying Certificate...</h2>

          <p>
            Please wait while we verify this certificate.
          </p>
        </div>
      </div>
    );
  }

  // ==============================
  // ERROR
  // ==============================

  if (error || !certificate) {
    return (
      <div className="public-page">
        <div className="verification-error">

          <div className="error-icon">
            <i className="bi bi-x-circle"></i>
          </div>

          <h1>
            Certificate Not Verified
          </h1>

          <p>
            {error ||
              "This certificate could not be verified."}
          </p>

          <a
            href="/"
            className="back-home-btn"
          >
            Back to CredCheck
          </a>

        </div>
      </div>
    );
  }

  // ==============================
  // STUDENT
  // ==============================

  const student = certificate.student;

  // ==============================
  // MAIN PAGE
  // ==============================

  return (
    <div className="public-page">

      {/* HEADER */}

      <header className="public-header">

        <div className="brand">

          <div className="brand-icon">
            <i className="bi bi-shield-check"></i>
          </div>

          <span>
            CredCheck
          </span>

        </div>

        <div className="verified-header">

          <i className="bi bi-patch-check-fill"></i>

          Verified Certificate

        </div>

      </header>


      {/* MAIN */}

      <main className="public-container">

        {/* VERIFIED MESSAGE */}

        <div className="verified-badge">

          <div className="verified-circle">

            <i className="bi bi-check-lg"></i>

          </div>

          <div>

            <h1>
              Certificate Verified
            </h1>

            <p>
              This certificate has been
              successfully verified.
            </p>

          </div>

        </div>


        {/* CERTIFICATE CARD */}

        <div className="public-card">

          {/* TITLE */}

          <div className="public-card-header">

            <div>

              <span className="verified-label">
                VERIFIED CERTIFICATE
              </span>

              <h2>
                {certificate.title}
              </h2>

            </div>

            <i className="bi bi-patch-check-fill certificate-check"></i>

          </div>


          {/* STUDENT */}

          <div className="student-profile">

            <div className="profile-avatar">

              {student?.name
                ? student.name
                    .charAt(0)
                    .toUpperCase()
                : "S"}

            </div>

            <div>

              <span>
                Awarded to
              </span>

              <h3>
                {student?.name ||
                  "Student"}
              </h3>

              {student?.college && (
                <p>
                  {student.college}
                </p>
              )}

            </div>

          </div>


          {/* DETAILS */}

          <div className="certificate-details-grid">

            {/* ORGANIZATION */}

            <div className="detail-item">

          <div className="detail-icon">

            <i className="bi bi-building"></i>

          </div>

          <div>

             <span>
                 Organization
               </span>

               <strong>

                 {certificate.organization}

                {certificate.trustedOrganization && (

                <span
                  style={{
                marginLeft: "10px",
            color: "green",
            fontSize: "14px"
          }}
        >
          🛡 Trusted Organization
        </span>

      )}

    </strong>

  </div>

</div>


            {/* ISSUE DATE */}

            <div className="detail-item">

              <div className="detail-icon">

                <i className="bi bi-calendar-check"></i>

              </div>

              <div>

                <span>
                  Issue Date
                </span>

                <strong>

                  {new Date(
                    certificate.issueDate
                  ).toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "long",
                      year: "numeric"
                    }
                  )}

                </strong>

              </div>

            </div>


            {/* DEGREE */}

            <div className="detail-item">

              <div className="detail-icon">

                <i className="bi bi-mortarboard"></i>

              </div>

              <div>

                <span>
                  Degree
                </span>

                <strong>
                  {student?.degree ||
                    "Not provided"}
                </strong>

              </div>

            </div>


            {/* EMAIL */}

            <div className="detail-item">

              <div className="detail-icon">

                <i className="bi bi-envelope"></i>

              </div>

              <div>

                <span>
                  Student Email
                </span>

                <strong>
                  {student?.email ||
                    "Not provided"}
                </strong>

              </div>

            </div>

          </div>


          {/* VERIFICATION STATUS */}

          <div className="verification-status">

            <div className="status-icon">

              <i className="bi bi-shield-check"></i>

            </div>

            <div>

              <strong>
                Verified by {certificate.verifierName || " CredCheck"}
              </strong>

              <p>
                This certificate was verified
                through the CredCheck
                verification system.
              </p>
              {certificate.verifiedAt && (
                <p>
                  Verified on{" "}
                    {new Date(
                        certificate.verifiedAt
                        ).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "long",
                            year: "numeric"
                          }
                        )}
                </p>
              )}


            </div>

          </div>


          {/* VERIFIER COMMENT */}

          {certificate.comments && (

            <div className="verifier-comments">

              <span>
                Verifier's Comment
              </span>

              <p>
                "{certificate.comments}"
              </p>

            </div>

          )}


          {/* VIEW PDF */}

          <div className="certificate-action">

            <a
              href={certificate.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="view-certificate-btn"
            >

              <i className="bi bi-file-earmark-pdf"></i>

              View Original Certificate

            </a>

          </div>


          {/* VERIFICATION ID */}

          <div className="certificate-id">

            <span>
              Verification ID
            </span>

            <code>
              {certificate.publicLinkId}
            </code>

          </div>

        </div>


        {/* SECURITY MESSAGE */}

        <p className="security-message">

          <i className="bi bi-shield-lock"></i>

          This is a secure, read-only verification
          record provided by CredCheck.

        </p>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button
              className="report-btn"
              onClick={() => setShowReportModal(true)}
            >
              Report this Certificate
            </button>
        </div>
        {showReportModal && (
          <div className="report-modal-overlay">
            <div className="report-modal">

             <h2>Report Certificate</h2>

            <textarea
              placeholder="Enter the reason..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />

            <div className="report-actions">

               <button
                 onClick={submitReport}
                 className="submit-report-btn"
               >
                 Submit
                </button>

                 <button
                   onClick={() => setShowReportModal(false)}
                   className="cancel-report-btn"
                 >
                   Cancel
                </button>

               </div>

             </div>
          </div>
        )}

      </main>

    </div>
  );
};

export default PublicCertificate;