const express = require("express");

const {
  createVerifierRequest,
  getVerifierRequests,
  updateVerifierRequestStatus
} = require("../controllers/verifierRequest.controller");

const protect = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const router = express.Router();

// ===============================
// CREATE VERIFIER REQUEST
// ===============================

// Anyone can request to become a verifier
router.post("/", createVerifierRequest);


// ===============================
// ADMIN: GET ALL VERIFIER REQUESTS
// ===============================

router.get(
  "/",
  protect,
  authorize("admin"),
  getVerifierRequests
);


// ===============================
// ADMIN: APPROVE OR REJECT REQUEST
// ===============================

router.patch(
  "/:id/status",
  protect,
  authorize("admin"),
  updateVerifierRequestStatus
);

module.exports = router;