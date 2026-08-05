const express = require("express");

const {
  getAdminStats,
  getAllStudents,
  getAllVerifiers,
  getAllCertificates,
  getAllVerifierRequests,
  approveVerifierRequest,
  rejectVerifierRequest,
  toggleTrustedOrganization,
  deleteUser,
  toggleBlockUser
} = require("../controllers/adminController");

const protect = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const router = express.Router();


// ==========================================
// ADMIN DASHBOARD STATISTICS
// ==========================================
router.get(
  "/stats",
  protect,
  authorize("admin"),
  getAdminStats
);


// ==========================================
// GET ALL STUDENTS
// ==========================================
router.get(
  "/students",
  protect,
  authorize("admin"),
  getAllStudents
);


// ==========================================
// GET ALL VERIFIERS
// ==========================================
router.get(
  "/verifiers",
  protect,
  authorize("admin"),
  getAllVerifiers
);


// ==========================================
// GET ALL CERTIFICATES
// ==========================================
router.get(
  "/certificates",
  protect,
  authorize("admin"),
  getAllCertificates
);


// ==========================================
// GET ALL VERIFIER REQUESTS
// ==========================================
router.get(
  "/verifier-requests",
  protect,
  authorize("admin"),
  getAllVerifierRequests
);


// ==========================================
// APPROVE VERIFIER REQUEST
// ==========================================
router.put(
  "/verifier-requests/:id/approve",
  protect,
  authorize("admin"),
  approveVerifierRequest
);


// ==========================================
// REJECT VERIFIER REQUEST
// ==========================================
router.put(
  "/verifier-requests/:id/reject",
  protect,
  authorize("admin"),
  rejectVerifierRequest
);

// ==========================================
// TOGGLE TRUSTED ORGANIZATION
// ==========================================

router.put(
  "/certificates/:id/trusted",
  protect,
  authorize("admin"),
  toggleTrustedOrganization
);
// ==========================================
// ADMIN DELETE USER
// ==========================================

router.delete(
  "/users/:id",
  protect,
  authorize("admin"),
  deleteUser
);
// ==========================================
// ADMIN BLOCK / UNBLOCK USER
// ==========================================

router.put(
  "/users/:id/block",
  protect,
  authorize("admin"),
  toggleBlockUser
);


module.exports = router;