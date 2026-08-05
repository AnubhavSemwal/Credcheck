const express = require("express");

const {
  registerUser,
  loginUser,
  googleLogin
} = require("../controllers/auth.controller");

const protect = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const router = express.Router();


// ==========================================
// REGISTER USER
// ==========================================

router.post(
  "/register",
  registerUser
);


// ==========================================
// LOGIN USER
// ==========================================

router.post(
  "/login",
  loginUser
);


// ==========================================
// GOOGLE LOGIN
// ==========================================

router.post(
  "/google",
  googleLogin
);


// ==========================================
// PROTECTED PROFILE ROUTE
// ==========================================

router.get(
  "/profile",
  protect,
  (req, res) => {

    res.status(200).json({
      message: "You are authorized",
      user: req.user
    });

  }
);


// ==========================================
// ADMIN ONLY TEST ROUTE
// ==========================================

router.get(
  "/admin-test",
  protect,
  authorize("admin"),
  (req, res) => {

    res.status(200).json({
      message:
        "Welcome Admin! You have access to this route."
    });

  }
);


module.exports = router;