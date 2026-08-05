const express = require("express");

const {
  createAbuseReport,
  getAllReports,
  resolveReport
} = require("../controllers/abuseReportController");

console.log({
  createAbuseReport,
  getAllReports,
  resolveReport
});


const protect = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const router = express.Router();

// ==========================================
// PUBLIC / STUDENT
// SUBMIT ABUSE REPORT
// ==========================================
router.post(
  "/",
  createAbuseReport
);

// ==========================================
// ADMIN
// GET ALL REPORTS
// ==========================================
router.get(
  "/",
  protect,
  authorize("admin"),
  getAllReports
);

// ==========================================
// ADMIN
// MARK REPORT RESOLVED
// ==========================================
router.put(
  "/:id/resolve",
  protect,
  authorize("admin"),
  resolveReport
);

module.exports = router;