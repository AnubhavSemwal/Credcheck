const mongoose = require("mongoose");

const verifierRequestSchema = new mongoose.Schema(
  {
    // Name of the organization
    organizationName: {
      type: String,
      required: true
    },

    // Organization email
    email: {
      type: String,
      required: true,
      unique: true
    },

    // Request status
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },

    // Date when request was submitted
    requestedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "VerifierRequest",
  verifierRequestSchema
);