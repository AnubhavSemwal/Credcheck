const AbuseReport = require("../models/AbuseReport");

// ==========================================
// CREATE ABUSE REPORT
// ==========================================
const createAbuseReport = async (req, res) => {
  try {
    const {
      certificateId,
      reporterEmail,
      reason,
      description
    } = req.body;

    if (!certificateId || !reason) {
      return res.status(400).json({
        message: "Certificate and reason are required."
      });
    }

    const report = await AbuseReport.create({
      certificate: certificateId,
      reporterEmail,
      reason,
      description
    });

    res.status(201).json({
      message: "Abuse report submitted successfully.",
      report
    });

  } catch (error) {
    console.error("Create Abuse Report Error:", error);

    res.status(500).json({
      message: "Failed to submit abuse report.",
      error: error.message
    });
  }
};

// ==========================================
// GET ALL REPORTS
// ==========================================
const getAllReports = async (req, res) => {
  try {

    const reports = await AbuseReport.find()
      .populate(
        "certificate",
        "title organization status publicLinkId"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      reports
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch reports.",
      error: error.message
    });

  }
};

// ==========================================
// RESOLVE REPORT
// ==========================================
const resolveReport = async (req, res) => {
  try {

    const report = await AbuseReport.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        message: "Report not found."
      });
    }

    report.status = "resolved";

    await report.save();

    res.status(200).json({
      message: "Report resolved successfully.",
      report
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to resolve report.",
      error: error.message
    });

  }
};

module.exports = {
  createAbuseReport,
  getAllReports,
  resolveReport
};