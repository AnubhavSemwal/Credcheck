import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
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
  // REDIRECT USER BASED ON ROLE
  // ==========================================

  const redirectUser = (user) => {

    if (user.role === "student") {

      navigate("/student-dashboard");

    } else if (user.role === "verifier") {

      navigate("/verifier-dashboard");

    } else if (user.role === "admin") {

      navigate("/admin-dashboard");

    } else {

      navigate("/");

    }

  };


  // ==========================================
  // NORMAL EMAIL/PASSWORD LOGIN
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );


      // Save JWT token
      localStorage.setItem(
        "token",
        response.data.token
      );


      // Save user information
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );


      setMessage(
        "Login successful! Redirecting..."
      );


      setTimeout(() => {

        redirectUser(
          response.data.user
        );

      }, 1000);


    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Login failed. Please check your credentials."
      );

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // GOOGLE LOGIN
  // ==========================================

  const handleGoogleSuccess = async (
    credentialResponse
  ) => {

    try {

      setError("");
      setMessage("");
      setLoading(true);


      console.log(
        "Google credential received"
      );


      // Send Google credential to backend
      const response = await axios.post(
        "http://localhost:5000/api/auth/google",
        {
          credential:
            credentialResponse.credential
        }
      );


      // Save JWT token
      localStorage.setItem(
        "token",
        response.data.token
      );


      // Save user information
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );


      setMessage(
        "Google login successful! Redirecting..."
      );


      setTimeout(() => {

        redirectUser(
          response.data.user
        );

      }, 1000);


    } catch (error) {

      console.error(
        "Google login error:",
        error
      );


      setError(
        error.response?.data?.message ||
        "Google login failed. Please try again."
      );


    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // GOOGLE LOGIN ERROR
  // ==========================================

  const handleGoogleError = () => {

    setError(
      "Google login failed. Please try again."
    );

  };


  // ==========================================
  // UI
  // ==========================================

  return (

    <div className="auth-page">


      {/* =====================================
          LEFT SIDE
      ===================================== */}

      <div className="auth-info">


        {/* Brand */}

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


        {/* Content */}

        <div className="auth-info-content">


          <div className="auth-badge">

            🛡️ Secure Credential Verification

          </div>


          <h1>

            Welcome
            <br />

            <span>
              Back to CredCheck.
            </span>

          </h1>


          <p>

            Access your CredCheck account to manage
            certificates, track verification requests,
            and securely verify digital credentials.

          </p>


          {/* Benefits */}

          <div className="auth-benefits">


            <div className="benefit-item">

              <div className="benefit-icon">
                🔐
              </div>

              <div>

                <strong>
                  Secure Authentication
                </strong>

                <span>
                  Your account is protected with JWT security.
                </span>

              </div>

            </div>


            <div className="benefit-item">

              <div className="benefit-icon">
                📄
              </div>

              <div>

                <strong>
                  Manage Credentials
                </strong>

                <span>
                  Upload and manage your certificates.
                </span>

              </div>

            </div>


            <div className="benefit-item">

              <div className="benefit-icon">
                ✓
              </div>

              <div>

                <strong>
                  Trusted Verification
                </strong>

                <span>
                  Verify credentials quickly and securely.
                </span>

              </div>

            </div>


          </div>

        </div>


        {/* Footer */}

        <div className="auth-info-footer">

          © 2026 CredCheck

        </div>


      </div>


      {/* =====================================
          RIGHT SIDE
      ===================================== */}

      <div className="auth-form-container">


        <div className="auth-form-card">


          {/* Mobile Brand */}

          <div className="mobile-auth-brand">

            <div className="auth-logo">
              ✓
            </div>

            <span>
              CredCheck
            </span>

          </div>


          {/* Header */}

          <div className="auth-form-header">

            <h2>
              Welcome Back
            </h2>

            <p>
              Login to manage and verify your credentials.
            </p>

          </div>


          {/* Success Message */}

          {message && (

            <div className="success-message">

              ✓ {message}

            </div>

          )}


          {/* Error Message */}

          {error && (

            <div className="error-message">

              ⚠ {error}

            </div>

          )}


          {/* =====================================
              GOOGLE LOGIN
          ===================================== */}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px"
            }}
          >

            <GoogleLogin
              onSuccess={
                handleGoogleSuccess
              }
              onError={
                handleGoogleError
              }
              useOneTap={false}
            />

          </div>


          {/* Divider */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "20px"
            }}
          >

            <div
              style={{
                flex: 1,
                height: "1px",
                background: "#e5e7eb"
              }}
            />

            <span
              style={{
                color: "#64748b",
                fontSize: "13px"
              }}
            >
              OR
            </span>

            <div
              style={{
                flex: 1,
                height: "1px",
                background: "#e5e7eb"
              }}
            />

          </div>


          {/* =====================================
              EMAIL LOGIN FORM
          ===================================== */}

          <form onSubmit={handleSubmit}>


            {/* Email */}

            <div className="form-group">

              <label>
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
                required
              />

            </div>


            {/* Password */}

            <div className="form-group">

              <label>
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={
                  formData.password
                }
                onChange={
                  handleChange
                }
                required
              />

            </div>


            {/* Remember / Forgot */}

            <div className="login-options">


              <label className="remember-me">

                <input
                  type="checkbox"
                />

                <span>
                  Remember me
                </span>

              </label>


              <button
                type="button"
                className="forgot-password"
                onClick={() => {

                  alert(
                    "Password reset functionality will be added soon."
                  );

                }}
              >

                Forgot Password?

              </button>


            </div>


            {/* Submit */}

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={loading}
            >

              {loading
                ? "Logging in..."
                : "Login →"
              }

            </button>


          </form>


          {/* Register */}

          <div className="auth-switch">

            Don't have an account?

            <button
              onClick={() =>
                navigate("/register")
              }
            >

              Create Account

            </button>

          </div>


          {/* Back Home */}

          <button
            className="back-home-btn"
            onClick={() =>
              navigate("/")
            }
          >

            ← Back to Home

          </button>


        </div>

      </div>


    </div>

  );

}

export default Login;