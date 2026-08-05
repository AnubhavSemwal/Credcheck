const express = require("express");

const {
  createCertificate,
  getMyCertificates,
  getPublicCertificate,
  generateCertificateQR
} = require("../controllers/certificate.controller");

const protect = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

// Upload middleware
const upload = require("../middleware/upload.middleware");

const router = express.Router();


// ==========================================
// CREATE CERTIFICATE
// Student only
// ==========================================
router.post(
  "/",
  protect,
  authorize("student"),
  upload.single("certificateFile"),
  createCertificate
);


// ==========================================
// GET MY CERTIFICATES
// Student only
// ==========================================
router.get(
  "/my-certificates",
  protect,
  authorize("student"),
  getMyCertificates
);


// ==========================================
// PUBLIC CERTIFICATE VERIFICATION
// No login required
// ==========================================
router.get(
  "/public/:publicLinkId",
  getPublicCertificate
);


// ==========================================
// GENERATE CERTIFICATE QR CODE
// No login required
// ==========================================
router.get(
  "/public/:publicLinkId/qr",
  generateCertificateQR
);


module.exports = router;