import React, { useState } from "react";
import "./VerifyRequest.css";

const VerifyRequest = () => {
  const [formData, setFormData] = useState({
    organizationName: "",
    email: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value
    }));
  };

  // ==========================================
  // SUBMIT VERIFIER REQUEST
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    // Validate form
    if (
      !formData.organizationName.trim() ||
      !formData.email.trim()
    ) {
      setError(
        "Please enter your organization name and email address."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/verifier-requests",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            organizationName:
              formData.organizationName.trim(),

            email:
              formData.email.trim()
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to submit verifier request."
        );
      }

      // Show success message
      setMessage(
        data.message ||
          "Your verifier request has been submitted successfully."
      );

      // Clear form
      setFormData({
        organizationName: "",
        email: ""
      });

    } catch (error) {
      console.error(
        "Verifier request error:",
        error
      );

      setError(
        error.message ||
          "Something went wrong. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-request-page">

      <div className="verify-request-card">

        {/* =====================================
            HEADER
        ====================================== */}

        <div className="verify-request-header">

          <div className="verify-request-badge">
            CREDcheck VERIFIER PROGRAM
          </div>

          <h1>
            Become a Verifier
          </h1>

          <p>
            Register your organization as a trusted
            certificate verifier on CredCheck.
          </p>

        </div>


        {/* =====================================
            SUCCESS MESSAGE
        ====================================== */}

        {message && (
          <div className="success-message">
            {message}
          </div>
        )}


        {/* =====================================
            ERROR MESSAGE
        ====================================== */}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}


        {/* =====================================
            FORM
        ====================================== */}

        <form
          onSubmit={handleSubmit}
          className="verify-request-form"
        >

          {/* ORGANIZATION NAME */}

          <div className="form-group">

            <label htmlFor="organizationName">
              Organization Name
            </label>

            <input
              id="organizationName"
              type="text"
              name="organizationName"
              placeholder="Enter your organization name"
              value={
                formData.organizationName
              }
              onChange={handleChange}
              disabled={loading}
              required
            />

          </div>


          {/* ORGANIZATION EMAIL */}

          <div className="form-group">

            <label htmlFor="email">
              Organization Email
            </label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="organization@example.com"
              value={
                formData.email
              }
              onChange={handleChange}
              disabled={loading}
              required
            />

          </div>


          {/* SUBMIT BUTTON */}

          <button
            type="submit"
            className="verify-request-submit"
            disabled={loading}
          >

            {loading
              ? "Submitting Request..."
              : "Submit Verifier Request"}

          </button>

        </form>


        {/* =====================================
            INFORMATION
        ====================================== */}

        <div className="verify-request-info">

          <h3>
            What happens next?
          </h3>

          <p>
            Your organization request will be
            reviewed by a CredCheck administrator.
            Once approved, your organization can
            verify certificates submitted by students.
          </p>

        </div>

      </div>

    </div>
  );
};

export default VerifyRequest;