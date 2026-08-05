const express = require("express");

const {
  getPendingCertificates,
  updateCertificateStatus
} = require("../controllers/verifier.controller");

const protect = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const router = express.Router();

// ======================================
// TEST ROUTE (Temporary)
// ======================================
router.get("/test", (req, res) => {
  res.json({
    message: "Verifier route is working"
  });
});

// ======================================
// GET PENDING CERTIFICATES
// ======================================
router.get(
  "/pending-certificates",
  protect,
  authorize("verifier"),
  getPendingCertificates
);

// ======================================
// APPROVE / REJECT CERTIFICATE
// ======================================
router.patch(
  "/certificates/:id/status",
  protect,
  authorize("verifier"),
  updateCertificateStatus
);

module.exports = router;