import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    college: "",
    degree: "",
    batch: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ==========================================
  // HANDLE INPUT CHANGES
  // ==========================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  // ==========================================
  // HANDLE REGISTRATION
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {

  let response;

  response = await axios.post(
    "http://localhost:5000/api/auth/register",
    formData
  );

  setMessage(
    response.data.message ||
    "Registration successful!"
  );
     

      // ==========================================
      // SUCCESS MESSAGE
      // ==========================================

      setMessage(
        response.data.message ||
        "Registration successful!"
      );


      // ==========================================
      // CLEAR FORM
      // ==========================================

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "student",
        college: "",
        degree: "",
        batch: ""
      });


      // ==========================================
      // REDIRECT TO LOGIN
      // ==========================================

      setTimeout(() => {
        navigate("/login");
      }, 2000);


    } catch (error) {

      console.error(
        "Registration error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Registration failed. Please try again."
      );

    } finally {

      setLoading(false);

    }
  };


  // ==========================================
  // REGISTER PAGE
  // ==========================================

  return (
    <div className="auth-page">

      {/* ==========================================
          LEFT SIDE
      ========================================== */}

      <div className="auth-info">

        <div
          className="auth-brand"
          onClick={() => navigate("/")}
        >

          <div className="auth-logo">
            ✓
          </div>

          <span>
            CredCheck
          </span>

        </div>


        <div className="auth-info-content">

          <div className="auth-badge">
            🛡️ Trusted Credential Verification
          </div>


          <h1>
            Build Trust
            <br />
            <span>
              With Verified Credentials.
            </span>
          </h1>


          <p>
            Join CredCheck and make your certificates and
            internship credentials easier to verify, share,
            and trust.
          </p>


          <div className="auth-benefits">

            {/* Benefit 1 */}

            <div className="benefit-item">

              <div className="benefit-icon">
                ✓
              </div>

              <div>

                <strong>
                  Secure & Reliable
                </strong>

                <span>
                  Your credential data is protected.
                </span>

              </div>

            </div>


            {/* Benefit 2 */}

            <div className="benefit-item">

              <div className="benefit-icon">
                ▦
              </div>

              <div>

                <strong>
                  QR Code Verification
                </strong>

                <span>
                  Share your credentials with a QR code.
                </span>

              </div>

            </div>


            {/* Benefit 3 */}

            <div className="benefit-item">

              <div className="benefit-icon">
                ⚡
              </div>

              <div>

                <strong>
                  Fast Verification
                </strong>

                <span>
                  Verify certificates in seconds.
                </span>

              </div>

            </div>

          </div>

        </div>


        <div className="auth-info-footer">
          © 2026 CredCheck
        </div>

      </div>


      {/* ==========================================
          RIGHT SIDE
      ========================================== */}

      <div className="auth-form-container">

        <div className="auth-form-card">


          {/* ==========================================
              MOBILE LOGO
          ========================================== */}

          <div className="mobile-auth-brand">

            <div className="auth-logo">
              ✓
            </div>

            <span>
              CredCheck
            </span>

          </div>


          {/* ==========================================
              FORM HEADER
          ========================================== */}

          <div className="auth-form-header">

            <h2>
              Create your account
            </h2>

            <p>
              Start verifying your credentials with CredCheck.
            </p>

          </div>


          {/* ==========================================
              SUCCESS MESSAGE
          ========================================== */}

          {message && (

            <div className="success-message">
              ✓ {message}
            </div>

          )}


          {/* ==========================================
              ERROR MESSAGE
          ========================================== */}

          {error && (

            <div className="error-message">
              ⚠ {error}
            </div>

          )}


          {/* ==========================================
              REGISTRATION FORM
          ========================================== */}

          <form onSubmit={handleSubmit}>


            {/* ==========================================
                NAME
            ========================================== */}

            <div className="form-group">

              <label>
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>


            {/* ==========================================
                EMAIL
            ========================================== */}

            <div className="form-group">

              <label>
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>


            {/* ==========================================
                PASSWORD
            ========================================== */}

            <div className="form-group">

              <label>
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
              />

            </div>


            {/* ==========================================
                ACCOUNT TYPE
            ========================================== */}

            <div className="form-group">

              <label>
                Account Type
              </label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
              >

                <option value="student">
                  Student
                </option>

                <option value="verifier">
                  Verifier
                </option>

              </select>

            </div>


            {/* ==========================================
                COLLEGE / ORGANIZATION
            ========================================== */}

            <div className="form-group">

              <label>
                College / Organization
              </label>

              <input
                type="text"
                name="college"
                placeholder="Enter your college or organization"
                value={formData.college}
                onChange={handleChange}
                required
              />

            </div>


            {/* ==========================================
                DEGREE / POSITION
            ========================================== */}

            <div className="form-group">

              <label>
                Degree / Position
              </label>

              <input
                type="text"
                name="degree"
                placeholder="e.g. B.Tech CSE"
                value={formData.degree}
                onChange={handleChange}
                required
              />

            </div>


            {/* ==========================================
                BATCH / YEAR
            ========================================== */}

            <div className="form-group">

              <label>
                Batch / Year
              </label>

              <input
                type="text"
                name="batch"
                placeholder="e.g. 2022 - 2026"
                value={formData.batch}
                onChange={handleChange}
                required
              />

            </div>


            {/* ==========================================
                SUBMIT BUTTON
            ========================================== */}

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={loading}
            >

              {loading
                ? "Creating Account..."
                : formData.role === "verifier"
                  ? "Submit Verifier Request →"
                  : "Create Account →"
              }

            </button>

          </form>


          {/* ==========================================
              LOGIN
          ========================================== */}

          <div className="auth-switch">

            Already have an account?

            <button
              onClick={() => navigate("/login")}
            >
              Login
            </button>

          </div>


          {/* ==========================================
              HOME
          ========================================== */}

          <button
            className="back-home-btn"
            onClick={() => navigate("/")}
          >
            ← Back to Home
          </button>

        </div>

      </div>

    </div>
  );
}


// ==========================================
// EXPORT REGISTER COMPONENT
// ==========================================

export default Register;