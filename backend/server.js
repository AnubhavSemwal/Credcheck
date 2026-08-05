const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);








const express = require("express");
const cors = require("cors");
require("dotenv").config();
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded" : "Not Loaded");
const connectDB = require("./config/db");

// Import routes
const authRoutes = require("./routes/auth.route");
const certificateRoutes = require("./routes/certificate.route");
const verifierRequestRoutes = require("./routes/verifierRequest.route");
const verifierRoutes = require("./routes/verifier.route");
const adminRoutes = require("./routes/adminRoutes");
const abuseReportRoutes = require("./routes/abuseReport.route");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "CredCheck API is running"
  });
});

// Auth routes
app.use("/api/auth", authRoutes);

// Certificate routes
app.use("/api/certificates", certificateRoutes);

// Verifier request routes
app.use("/api/verifier-requests", verifierRequestRoutes);

// Verifier routes
app.use("/api/verifier", verifierRoutes);

app.use(
  "/api/admin",
  adminRoutes
);
app.use(
  "/api/abuse-reports",
  abuseReportRoutes
);

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});