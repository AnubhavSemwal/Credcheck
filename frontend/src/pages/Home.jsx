import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">

      {/* ================= NAVBAR ================= */}

      <nav className="navbar">

        {/* Logo */}

        <div
          className="navbar-logo"
          onClick={() => navigate("/")}
        >
          <div className="logo-icon">
            ✓
          </div>

          <span>
            CredCheck
          </span>
        </div>


        {/* Navigation Links */}

        <div className="nav-links">

          <a href="#features">
            Features
          </a>

          <a href="#how-it-works">
            How It Works
          </a>

          <a href="#about">
            About
          </a>

        </div>


        {/* Navigation Buttons */}

        <div className="nav-buttons">

          <button
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>

        </div>

      </nav>


      {/* ================= HERO SECTION ================= */}

      <section className="hero-section">

        <div className="hero-content">

          <div className="hero-badge">
            ✓ Secure Digital Credential Verification
          </div>


          <h1>
            Verify Your Credentials
            <br />

            <span>
              With Confidence
            </span>
          </h1>


          <p>
            CredCheck is a secure certificate and internship
            verification platform that makes it easy for students,
            organizations, and verifiers to validate credentials.
          </p>


          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={() => navigate("/register")}
            >
              Get Started →
            </button>


            <button
              className="secondary-btn"
              onClick={() => navigate("/login")}
            >
              Login to Account
            </button>

          </div>


          <div className="trust-items">

            <span>
              ✓ Secure Verification
            </span>

            <span>
              ✓ QR Code Enabled
            </span>

            <span>
              ✓ Easy to Verify
            </span>

          </div>

        </div>


        {/* ================= VERIFICATION CARD ================= */}

        <div className="hero-visual">

          <div className="verification-card">

            <div className="verification-card-header">

              <div className="verification-icon">
                ✓
              </div>

              <div>

                <h3>
                  Certificate Verified
                </h3>

                <p>
                  CredCheck Verification
                </p>

              </div>

            </div>


            <div className="verified-status">

              <div className="status-icon">
                ✓
              </div>

              <div>

                <strong>
                  Verified Successfully
                </strong>

                <p>
                  This credential is authentic
                </p>

              </div>

            </div>


            <div className="certificate-details">

              <div>

                <span>
                  Certificate
                </span>

                <strong>
                  Internship Certificate
                </strong>

              </div>


              <div>

                <span>
                  Organization
                </span>

                <strong>
                  ABC Company
                </strong>

              </div>


              <div>

                <span>
                  Status
                </span>

                <strong className="approved">
                  ● Approved
                </strong>

              </div>

            </div>


            <div className="qr-section">

              <div className="qr-placeholder">
                ▦
              </div>

              <div>

                <span>
                  Verification ID
                </span>

                <strong>
                  CC-2026-VERIFIED
                </strong>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}

      <section
        className="features-section"
        id="features"
      >

        <div className="section-heading">

          <span>
            WHY CREDCHECK
          </span>

          <h2>
            Everything You Need for Credential Verification
          </h2>

          <p>
            A simple and secure platform designed to make
            certificate verification faster and more reliable.
          </p>

        </div>


        <div className="features-grid">


          {/* Feature 1 */}

          <div className="feature-card">

            <div className="feature-icon">
              🔐
            </div>

            <h3>
              Secure Verification
            </h3>

            <p>
              Credentials are verified through a secure
              authentication and authorization system.
            </p>

          </div>


          {/* Feature 2 */}

          <div className="feature-card">

            <div className="feature-icon">
              ⚡
            </div>

            <h3>
              Fast Verification
            </h3>

            <p>
              Quickly check certificate authenticity without
              unnecessary manual verification processes.
            </p>

          </div>


          {/* Feature 3 */}

          <div className="feature-card">

            <div className="feature-icon">
              ▦
            </div>

            <h3>
              QR Code Verification
            </h3>

            <p>
              Scan a QR code to access a certificate's
              public verification information.
            </p>

          </div>


          {/* Feature 4 */}

          <div className="feature-card">

            <div className="feature-icon">
              🌐
            </div>

            <h3>
              Public Verification
            </h3>

            <p>
              Anyone can verify an approved certificate
              using its unique public verification link.
            </p>

          </div>

        </div>

      </section>


      {/* ================= HOW IT WORKS ================= */}

      <section
        className="how-section"
        id="how-it-works"
      >

        <div className="section-heading">

          <span>
            SIMPLE PROCESS
          </span>

          <h2>
            How CredCheck Works
          </h2>

          <p>
            Verify credentials in four simple steps.
          </p>

        </div>


        <div className="steps-grid">


          {/* Step 1 */}

          <div className="step-card">

            <div className="step-number">
              01
            </div>

            <div className="step-icon">
              👤
            </div>

            <h3>
              Create Account
            </h3>

            <p>
              Register as a student or verifier
              on the CredCheck platform.
            </p>

          </div>


          {/* Step 2 */}

          <div className="step-card">

            <div className="step-number">
              02
            </div>

            <div className="step-icon">
              📄
            </div>

            <h3>
              Submit Certificate
            </h3>

            <p>
              Submit your certificate and internship
              details for verification.
            </p>

          </div>


          {/* Step 3 */}

          <div className="step-card">

            <div className="step-number">
              03
            </div>

            <div className="step-icon">
              ✓
            </div>

            <h3>
              Get Verified
            </h3>

            <p>
              An authorized verifier reviews and
              approves your submitted credential.
            </p>

          </div>


          {/* Step 4 */}

          <div className="step-card">

            <div className="step-number">
              04
            </div>

            <div className="step-icon">
              🔍
            </div>

            <h3>
              Share & Verify
            </h3>

            <p>
              Share your QR code or public link
              to verify your credential.
            </p>

          </div>

        </div>

      </section>


      {/* ================= STATS ================= */}

      <section className="stats-section">

        <div className="stat-item">

          <h2>
            100%
          </h2>

          <p>
            Secure
          </p>

        </div>


        <div className="stat-item">

          <h2>
            QR
          </h2>

          <p>
            Enabled
          </p>

        </div>


        <div className="stat-item">

          <h2>
            24/7
          </h2>

          <p>
            Accessible
          </p>

        </div>


        <div className="stat-item">

          <h2>
            3+
          </h2>

          <p>
            User Roles
          </p>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section
        className="cta-section"
        id="about"
      >

        <div className="cta-content">

          <h2>
            Ready to Verify Your Credentials?
          </h2>

          <p>
            Join CredCheck and make your certificates
            easier to verify and trust.
          </p>

          <button
            onClick={() => navigate("/register")}
          >
            Create Your Account →
          </button>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <div className="footer-content">

          <div className="footer-brand">

            <div className="footer-logo">

              <div className="logo-icon">
                ✓
              </div>

              <span>
                CredCheck
              </span>

            </div>

            <p>
              Secure and transparent certificate
              and internship verification.
            </p>

          </div>


          <div className="footer-column">

            <h4>
              Platform
            </h4>

            <a href="#features">
              Features
            </a>

            <a href="#how-it-works">
              How It Works
            </a>

          </div>


          <div className="footer-column">

            <h4>
              Account
            </h4>

            <button
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
            >
              Register
            </button>

          </div>

        </div>


        <div className="footer-bottom">

          <p>
            © 2026 CredCheck. All rights reserved.
          </p>

          <p>
            Built with MERN Stack
          </p>

        </div>

      </footer>

    </div>
  );
}

export default Home;