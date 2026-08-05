const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // ==========================================
    // USER NAME
    // ==========================================
    name: {
      type: String,
      required: true
    },

    // ==========================================
    // USER EMAIL
    // ==========================================
    email: {
      type: String,
      required: true,
      unique: true
    },

    // ==========================================
    // PASSWORD
    // Not required for Google users
    // ==========================================
    password: {
      type: String,
      required: false
    },

    // ==========================================
    // GOOGLE ACCOUNT ID
    // ==========================================
    googleId: {
      type: String,
      unique: true,
      sparse: true
    },

    // ==========================================
    // AUTH PROVIDER
    // password OR google
    // ==========================================
    authProvider: {
      type: String,
      enum: ["password", "google"],
      default: "password"
    },

    // ==========================================
    // USER ROLE
    // ==========================================
    role: {
      type: String,
      enum: ["student", "verifier", "admin"],
      default: "student"
    },

    // ==========================================
    // COLLEGE
    // ==========================================
    college: {
      type: String
    },

    // ==========================================
    // DEGREE
    // ==========================================
    degree: {
      type: String
    },

    // ==========================================
    // BATCH
    // ==========================================
    batch: {
      type: String
    },

    // ==========================================
    // VERIFIED
    // ==========================================
    verified: {
      type: Boolean,
      default: false
    },
    
    blocked: {
  type: Boolean,
  default: false
  },
  },
  {
    timestamps: true
  }


);

const User = mongoose.model(
  "User",
  userSchema
);

module.exports = User;