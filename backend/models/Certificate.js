const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
  {
    // Student who uploaded the certificate
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // Certificate title
    title: {
      type: String,
      required: true
    },

    // Organization name
    organization: {
      type: String,
      required: true
    },


    trustedOrganization: {
     type: Boolean,
     default: false
    },

    // Verifier email to route the request to the correct organization
    verifierEmail: {
      type: String,
      required: true
    },

    // Date when certificate was issued
    issueDate: {
      type: Date,
      required: true
    },
    // Uploaded certificate file URL
    fileUrl: {
      type: String,
      required: true
},

    // Certificate verification status
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },

    // Verifier's comment
    comments: {
      type: String,
      default: ""
    },

    // Unique ID for public certificate verification
    // It will be generated only after approval
    publicLinkId: {
      type: String,
      unique: true,
      sparse: true
    },
    // Verifier who approved/rejected the certificate
    verifierName: {
      type: String,
      default: ""
    },

// Date and time when certificate was verified
    verifiedAt: {
       type: Date,
       default: null
    },

    
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Certificate",
  certificateSchema
);