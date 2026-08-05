const mongoose = require("mongoose");

const abuseReportSchema = new mongoose.Schema(
  {
    // Certificate being reported
    certificate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Certificate",
      required: true
    },

    // Optional reporter email
    reporterEmail: {
      type: String,
      default: ""
    },

    // Reason
    reason: {
      type: String,
      required: true
    },

    // Optional details
    description: {
      type: String,
      default: ""
    },

    // Report status
    status: {
      type: String,
      enum: ["pending", "resolved"],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "AbuseReport",
  abuseReportSchema
);