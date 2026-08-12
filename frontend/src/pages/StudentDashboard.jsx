import React, {
  useEffect,
  useRef,
  useState
} from "react";

import DashboardLayout from "../components/dashboard/DashboardLayout";

import "./StudentDashboard.css";


const StudentDashboard = () => {

  // ==========================================
  // CERTIFICATES STATE
  // ==========================================

  const [certificates, setCertificates] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  // ==========================================
  // UPLOAD MODAL STATE
  // ==========================================

  const [showUploadModal, setShowUploadModal] =
    useState(false);


  // ==========================================
  // QR MODAL STATE
  // ==========================================

  const [showQRModal, setShowQRModal] =
    useState(false);

  const [selectedCertificate, setSelectedCertificate] =
    useState(null);

  const [qrCode, setQrCode] =
    useState("");

  const [loadingQR, setLoadingQR] =
    useState(false);


  // ==========================================
  // UPLOAD STATE
  // ==========================================

  const [uploading, setUploading] =
    useState(false);


  // ==========================================
  // CERTIFICATE SECTION REF
  // Used by Sidebar "My Certificates"
  // ==========================================

  const certificatesSectionRef =
    useRef(null);


  // ==========================================
  // FORM DATA
  // ==========================================

  const [formData, setFormData] = useState({

    title: "",

    organization: "",

    verifierEmail: "",

    issueDate: "",

    certificateFile: null

  });


  // ==========================================
  // GET TOKEN
  // ==========================================

  const getToken = () => {

    return localStorage.getItem("token");

  };


  // ==========================================
  // SIDEBAR MENU HANDLER
  // ==========================================

  const handleMenuChange = (menu) => {

    // ========================================
    // DASHBOARD
    // ========================================

    if (menu === "dashboard") {

      window.scrollTo({

        top: 0,

        behavior: "smooth"

      });

    }


    // ========================================
    // UPLOAD CERTIFICATE
    // ========================================

    if (menu === "upload") {

      setShowUploadModal(true);

    }


    // ========================================
    // MY CERTIFICATES
    // ========================================

    if (menu === "certificates") {

      setTimeout(() => {

        certificatesSectionRef.current?.scrollIntoView({

          behavior: "smooth",

          block: "start"

        });

      }, 100);

    }


    // ========================================
    // PROFILE
    // ========================================

    if (menu === "profile") {

      alert(
        "Profile section coming soon."
      );

    }

  };


  // ==========================================
  // FETCH CERTIFICATES
  // ==========================================

  const fetchCertificates = async () => {

    try {

      setLoading(true);

      const token =
        getToken();


      const response =
        await fetch(

          "http://localhost:5000/api/certificates/my-certificates",

          {

            method: "GET",

            headers: {

              Authorization:
                `Bearer ${token}`

            }

          }

        );


      const data =
        await response.json();


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
  // FORM INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {

    const {

      name,

      value,

      files

    } = e.target;


    // FILE INPUT

    if (name === "certificateFile") {

      setFormData({

        ...formData,

        certificateFile:

          files[0]

      });

    }

    // OTHER INPUTS

    else {

      setFormData({

        ...formData,

        [name]:

          value

      });

    }

  };


  // ==========================================
  // SUBMIT CERTIFICATE
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();


    // CHECK FILE

    if (!formData.certificateFile) {

      alert(

        "Please select a certificate file"

      );

      return;

    }


    try {

      setUploading(true);


      const token =
        getToken();


      const data =
        new FormData();


      data.append(

        "title",

        formData.title

      );


      data.append(

        "organization",

        formData.organization

      );


      data.append(

        "verifierEmail",

        formData.verifierEmail

      );


      data.append(

        "issueDate",

        formData.issueDate

      );


      data.append(

        "certificateFile",

        formData.certificateFile

      );


      // ======================================
      // SEND REQUEST
      // ======================================

      const response =
        await fetch(

          `${import.meta.env.VITE_API_URL}/api/certificates`,

          {

            method: "POST",

            headers: {

              Authorization:

                `Bearer ${token}`

            },

            body: data

          }

        );


      const result =
        await response.json();


      if (!response.ok) {

        throw new Error(

          result.message ||

          "Certificate upload failed"

        );

      }


      // ======================================
      // SUCCESS
      // ======================================

      alert(

        "Certificate submitted successfully"

      );


      // CLOSE MODAL

      setShowUploadModal(false);


      // RESET FORM

      setFormData({

        title: "",

        organization: "",

        verifierEmail: "",

        issueDate: "",

        certificateFile: null

      });


      // REFRESH CERTIFICATES

      fetchCertificates();


    } catch (error) {

      console.error(

        "Certificate upload error:",

        error

      );


      alert(

        error.message ||

        "Certificate upload failed"

      );


    } finally {

      setUploading(false);

    }

  };


  // ==========================================
  // VIEW CERTIFICATE
  // ==========================================

  const handleViewCertificate = (fileUrl) => {

    if (!fileUrl) {

      alert(

        "Certificate file is not available"

      );

      return;

    }


    window.open(

      fileUrl,

      "_blank",

      "noopener,noreferrer"

    );

  };


  // ==========================================
  // GENERATE QR CODE
  // ==========================================

  const handleGenerateQR = async (
    certificate
  ) => {

    if (!certificate.publicLinkId) {

      alert(

        "QR code is not available yet."

      );

      return;

    }


    try {

      setLoadingQR(true);


      setSelectedCertificate(

        certificate

      );


      setShowQRModal(true);


      setQrCode("");


      // ======================================
      // QR API REQUEST
      // ======================================

      const response =
        await fetch(

          `http://localhost:5000/api/certificates/public/${certificate.publicLinkId}/qr`

        );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(

          data.message ||

          "Failed to generate QR code"

        );

      }


      setQrCode(

        data.qrCode

      );


    } catch (error) {

      console.error(

        "QR generation error:",

        error

      );


      alert(

        error.message ||

        "Failed to generate QR code"

      );


      setShowQRModal(false);


    } finally {

      setLoadingQR(false);

    }

  };


  // ==========================================
  // CLOSE QR MODAL
  // ==========================================

  const closeQRModal = () => {

    setShowQRModal(false);

    setQrCode("");

    setSelectedCertificate(null);

  };
  // ==========================================
// DOWNLOAD QR CODE
// ==========================================

const handleDownloadQR = () => {

  if (!qrCode) {
    alert("QR code is not available");
    return;
  }

  const link = document.createElement("a");

  link.href = qrCode;

  link.download =
    `${selectedCertificate?.title || "certificate"}-QR.png`;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

};


// ==========================================
// COPY PUBLIC CERTIFICATE LINK
// ==========================================

const handleCopyLink = async () => {

  if (!selectedCertificate?.publicLinkId) {
    return;
  }

  const publicLink =
    `${window.location.origin}/cert/${selectedCertificate.publicLinkId}`;

  try {

    await navigator.clipboard.writeText(
      publicLink
    );

    alert(
      "Certificate link copied successfully!"
    );

  } catch (error) {

    console.error(
      "Copy link error:",
      error
    );

    alert(
      "Failed to copy certificate link"
    );

  }

};


// ==========================================
// SHARE CERTIFICATE
// ==========================================

const handleShareCertificate = async () => {

  if (!selectedCertificate?.publicLinkId) {
    return;
  }

  const publicLink =
    `${window.location.origin}/cert/${selectedCertificate.publicLinkId}`;

  try {

    if (navigator.share) {

      await navigator.share({

        title:
          selectedCertificate.title,

        text:
          "Check my verified certificate on CredCheck",

        url:
          publicLink

      });

    } else {

      await navigator.clipboard.writeText(
        publicLink
      );

      alert(
        "Sharing is not supported on this browser. Link copied instead!"
      );

    }

  } catch (error) {

    // User cancelled share dialog
    if (error.name !== "AbortError") {

      console.error(
        "Share error:",
        error
      );

    }

  }

};
  


  // ==========================================
  // STATISTICS
  // ==========================================

  const totalCertificates =
    certificates.length;


  const approvedCertificates =
    certificates.filter(

      (certificate) =>

        certificate.status ===
        "approved"

    ).length;


  const pendingCertificates =
    certificates.filter(

      (certificate) =>

        certificate.status ===
        "pending"

    ).length;


  const rejectedCertificates =
    certificates.filter(

      (certificate) =>

        certificate.status ===
        "rejected"

    ).length;


  // ==========================================
  // STATUS CLASS
  // ==========================================

  const getStatusClass = (status) => {

    if (status === "approved") {

      return "approved";

    }


    if (status === "rejected") {

      return "rejected";

    }


    return "pending";

  };


  // ==========================================
  // STATUS ICON
  // ==========================================

  const getStatusIcon = (status) => {

    if (status === "approved") {

      return "bi bi-check-circle-fill";

    }


    if (status === "rejected") {

      return "bi bi-x-circle-fill";

    }


    return "bi bi-clock-fill";

  };


  // ==========================================
  // RETURN
  // ==========================================

  return (

    <DashboardLayout

      userName="Ankit"

      onUpload={() =>

        setShowUploadModal(true)

      }

      onMenuChange={

        handleMenuChange

      }

    >

      <div className="student-dashboard">


        {/* ======================================
            HERO / WELCOME
        ====================================== */}

        <section className="dashboard-hero">

          <div className="hero-content">

            <span className="hero-badge">

              <i className="bi bi-stars"></i>

              CredCheck Student Portal

            </span>


            <h1>

              Manage Your

              <span>
                {" "}Achievements
              </span>

            </h1>


            <p>

              Upload, track, and verify your

              certificates — all in one secure

              place.

            </p>


            <button

              className="hero-upload-btn"

              onClick={() =>

                setShowUploadModal(true)

              }

            >

              <i className="bi bi-cloud-arrow-up"></i>

              Upload New Certificate

            </button>

          </div>


          <div className="hero-visual">

            <div className="hero-circle">

              <i className="bi bi-shield-check"></i>

            </div>


            <div className="floating-card floating-card-one">

              <i className="bi bi-patch-check-fill"></i>

              Verified

            </div>


            <div className="floating-card floating-card-two">

              <i className="bi bi-award-fill"></i>

              Achievements

            </div>

          </div>

        </section>


        {/* ======================================
            STATISTICS
        ====================================== */}

        <section className="stats-grid">


          {/* TOTAL */}

          <div className="stat-card stat-blue">

            <div className="stat-card-top">

              <div className="stat-icon">

                <i className="bi bi-files"></i>

              </div>

              <span className="stat-arrow">

                <i className="bi bi-arrow-up-right"></i>

              </span>

            </div>


            <div className="stat-content">

              <span>
                Total Certificates
              </span>

              <strong>

                {totalCertificates}

              </strong>

            </div>

          </div>


          {/* APPROVED */}

          <div className="stat-card stat-green">

            <div className="stat-card-top">

              <div className="stat-icon">

                <i className="bi bi-patch-check"></i>

              </div>

              <span className="stat-arrow">

                <i className="bi bi-check-lg"></i>

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


          {/* PENDING */}

          <div className="stat-card stat-orange">

            <div className="stat-card-top">

              <div className="stat-icon">

                <i className="bi bi-hourglass-split"></i>

              </div>

              <span className="stat-arrow">

                <i className="bi bi-clock"></i>

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


          {/* REJECTED */}

          <div className="stat-card stat-red">

            <div className="stat-card-top">

              <div className="stat-icon">

                <i className="bi bi-exclamation-circle"></i>

              </div>

              <span className="stat-arrow">

                <i className="bi bi-x-lg"></i>

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
            CERTIFICATES SECTION
        ====================================== */}

        <section

          className="certificates-section"

          ref={certificatesSectionRef}

        >


          {/* SECTION HEADER */}

          <div className="section-header">

            <div>

              <span className="section-label">

                <i className="bi bi-collection"></i>

                YOUR ACHIEVEMENTS

              </span>


              <h2>

                My Certificates

              </h2>


              <p>

                View and manage all your

                submitted certificates.

              </p>

            </div>


            <div className="certificate-actions">


              {/* REFRESH */}

              <button

                className="refresh-button"

                onClick={

                  fetchCertificates

                }

              >

                <i className="bi bi-arrow-clockwise"></i>

                Refresh

              </button>


              {/* UPLOAD */}

              <button

                className="upload-button"

                onClick={() =>

                  setShowUploadModal(true)

                }

              >

                <i className="bi bi-plus-lg"></i>

                Upload Certificate

              </button>

            </div>

          </div>


          {/* ====================================
              LOADING
          ==================================== */}

          {loading ? (

            <div className="dashboard-message">

              <div className="loading-animation">

                <i className="bi bi-shield-check"></i>

              </div>

              <h3>

                Loading your certificates...

              </h3>

              <p>

                Please wait while we fetch your

                achievements.

              </p>

            </div>

          ) : certificates.length === 0 ? (


            /* ====================================
               EMPTY
            ==================================== */

            <div className="dashboard-message empty-state">

              <div className="empty-icon-wrapper">

                <i className="bi bi-award"></i>

              </div>

              <h3>

                No certificates yet

              </h3>

              <p>

                Your achievements will appear

                here once you upload your first

                certificate.

              </p>

              <button

                className="empty-upload-button"

                onClick={() =>

                  setShowUploadModal(true)

                }

              >

                <i className="bi bi-cloud-upload"></i>

                Upload Your First Certificate

              </button>

            </div>

          ) : (


            /* ====================================
               CERTIFICATE GRID
            ==================================== */

            <div className="certificate-grid">


              {certificates.map(

                (certificate) => (

                  <article

                    className="certificate-card"

                    key={

                      certificate._id

                    }

                  >


                    {/* CARD HEADER */}

                    <div className="certificate-card-top">

                      <div className="certificate-icon">

                        <i className="bi bi-file-earmark-check-fill"></i>

                      </div>


                      <span

                        className={

                          `status-badge ${
                            getStatusClass(
                              certificate.status
                            )
                          }`

                        }

                      >

                        <i

                          className={

                            getStatusIcon(

                              certificate.status

                            )

                          }

                        ></i>


                        {certificate.status ||

                          "pending"}

                      </span>

                    </div>


                    {/* CERTIFICATE INFO */}

                    <div className="certificate-info">

                      <h3>

                        {certificate.title}

                      </h3>


                      <div className="certificate-detail">

                        <i className="bi bi-building"></i>

                        <span>

                          {certificate.organization}

                        </span>

                      </div>


                      <div className="certificate-detail">

                        <i className="bi bi-envelope"></i>

                        <span>

                          {certificate.verifierEmail}

                        </span>

                      </div>


                      <div className="certificate-detail">

                        <i className="bi bi-calendar3"></i>

                        <span>

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
                                    "numeric"

                                }

                              )

                            : "N/A"}

                        </span>

                      </div>

                    </div>


                    {/* CARD FOOTER */}

                    <div className="certificate-card-footer">


                      {/* VIEW */}

                      <button

                        className="view-button"

                        onClick={() =>

                          handleViewCertificate(

                            certificate.fileUrl

                          )

                        }

                      >

                        <i className="bi bi-eye"></i>

                        View

                      </button>


                      {/* QR */}

                      {certificate.status ===

                        "approved" && (

                        <button

                          className="qr-button"

                          onClick={() =>

                            handleGenerateQR(

                              certificate

                            )

                          }

                        >

                          <i className="bi bi-qr-code"></i>

                          QR Code

                        </button>

                      )}

                    </div>

                  </article>

                )

              )}

            </div>

          )}

        </section>


        {/* ======================================
            UPLOAD MODAL
        ====================================== */}

        {showUploadModal && (

          <div

            className="modal-overlay"

            onClick={(e) => {

              if (

                e.target ===

                e.currentTarget

              ) {

                setShowUploadModal(false);

              }

            }}

          >

            <div className="upload-modal">


              {/* MODAL HEADER */}

              <div className="modal-header">

                <div>

                  <span className="modal-label">

                    <i className="bi bi-shield-check"></i>

                    SECURE SUBMISSION

                  </span>


                  <h2>

                    Upload Certificate

                  </h2>


                  <p>

                    Submit your achievement

                    for verification.

                  </p>

                </div>


                <button

                  className="close-modal"

                  onClick={() =>

                    setShowUploadModal(false)

                  }

                >

                  <i className="bi bi-x-lg"></i>

                </button>

              </div>


              {/* FORM */}

              <form

                className="upload-form"

                onSubmit={

                  handleSubmit

                }

              >


                {/* TITLE */}

                <div className="form-group">

                  <label>

                    <i className="bi bi-award"></i>

                    Certificate Title

                  </label>


                  <input

                    type="text"

                    name="title"

                    value={

                      formData.title

                    }

                    onChange={

                      handleChange

                    }

                    placeholder=

                      "e.g. Full Stack Development"

                    required

                  />

                </div>


                {/* ORGANIZATION */}

                <div className="form-group">

                  <label>

                    <i className="bi bi-building"></i>

                    Organization

                  </label>


                  <input

                    type="text"

                    name="organization"

                    value={

                      formData.organization

                    }

                    onChange={

                      handleChange

                    }

                    placeholder=

                      "e.g. Google, Microsoft"

                    required

                  />

                </div>


                {/* VERIFIER EMAIL */}

                <div className="form-group">

                  <label>

                    <i className="bi bi-envelope"></i>

                    Verifier Email

                  </label>


                  <input

                    type="email"

                    name="verifierEmail"

                    value={

                      formData.verifierEmail

                    }

                    onChange={

                      handleChange

                    }

                    placeholder=

                      "Enter verifier email"

                    required

                  />

                </div>


                {/* ISSUE DATE */}

                <div className="form-group">

                  <label>

                    <i className="bi bi-calendar3"></i>

                    Issue Date

                  </label>


                  <input

                    type="date"

                    name="issueDate"

                    value={

                      formData.issueDate

                    }

                    onChange={

                      handleChange

                    }

                    required

                  />

                </div>


                {/* FILE */}

                <div className="form-group">

                  <label>

                    <i className="bi bi-file-earmark-arrow-up"></i>

                    Certificate File

                  </label>


                  <div className="file-upload-box">

                    <i className="bi bi-cloud-arrow-up"></i>


                    <p>

                      {formData.certificateFile

                        ? formData

                            .certificateFile

                            .name

                        : "Click to select PDF or image"}

                    </p>


                    <span>

                      PDF, JPG, JPEG or PNG

                    </span>


                    <input

                      type="file"

                      name="certificateFile"

                      accept=

                        ".pdf,.jpg,.jpeg,.png"

                      onChange={

                        handleChange

                      }

                      required

                    />

                  </div>

                </div>


                {/* SUBMIT */}

                <button

                  type="submit"

                  className=

                    "submit-upload-button"

                  disabled={

                    uploading

                  }

                >

                  {uploading ? (

                    <>

                      <span className="button-spinner"></span>

                      Uploading...

                    </>

                  ) : (

                    <>

                      <i className="bi bi-cloud-upload"></i>

                      Submit Certificate

                    </>

                  )}

                </button>

              </form>

            </div>

          </div>

        )}


        {/* ======================================
            QR CODE MODAL
        ====================================== */}

        {showQRModal && (

          <div

            className="modal-overlay"

            onClick={(e) => {

              if (

                e.target ===

                e.currentTarget

              ) {

                closeQRModal();

              }

            }}

          >

            <div className="qr-modal">


              {/* QR HEADER */}

              <div className="qr-modal-header">

                <div>

                  <span className="modal-label">

                    <i className="bi bi-shield-check"></i>

                    VERIFIED CERTIFICATE

                  </span>


                  <h2>

                    Certificate QR Code

                  </h2>

                </div>


                <button

                  className="close-modal"

                  onClick={

                    closeQRModal

                  }

                >

                  <i className="bi bi-x-lg"></i>

                </button>

              </div>


              {/* QR CONTENT */}

              <div className="qr-modal-content">

                {loadingQR ? (

                  <>

                    <div className="qr-loading">

                      <div className="button-spinner"></div>

                    </div>


                    <h3>

                      Generating QR Code...

                    </h3>


                    <p>

                      Please wait.

                    </p>

                  </>

                ) : (

                  <>

                    {qrCode && (

                      <img

                        src={qrCode}

                        alt="Certificate QR Code"

                        className="qr-image"

                      />

                    )}


                {selectedCertificate && (

                  <>

                    <h3>
                     {selectedCertificate.title}
                    </h3>

                    <p>
                        Scan this QR code to verify this certificate.
                    </p>

                     <div className="qr-verification-link">

                       <i className="bi bi-link-45deg"></i>

                      <span>
                      
                         {window.location.origin}/cert/
                        {selectedCertificate.publicLinkId}

                       </span>

                    </div>


                   {/* QR ACTION BUTTONS */}

                    <div className="qr-action-buttons">

                       <button
                           className="qr-download-button"
                           onClick={handleDownloadQR}
                       >
                          <i className="bi bi-download"></i>
                            Download QR
                        </button>


                        <button
                          className="qr-share-button"
                          onClick={handleShareCertificate}
                        >
                          <i className="bi bi-share"></i>
                          Share Link
                        </button>


                        <button
                           className="qr-copy-button"
                           onClick={handleCopyLink}
                        >
                           <i className="bi bi-clipboard"></i>
                            Copy Link
                       </button>

                     </div>

                    </>

                   )}

                    

                  </>

                )}

              </div>

            </div>

          </div>

        )}

      </div>

    </DashboardLayout>

  );

};


export default StudentDashboard;