const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    let token;

    // Check if Authorization header exists
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Get token from "Bearer <token>"
      token = req.headers.authorization.split(" ")[1];
    }

    // If no token found
    if (!token) {
      return res.status(401).json({
        message: "Not authorized, no token",
      });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user in MongoDB using userId from token
    const user = await User.findById(decoded.userId).select("-password");

    // If user doesn't exist
    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    // Store actual user in request
    req.user = user;

    // ===== DEBUG LOGS =====
    console.log("========== AUTH DEBUG ==========");
    console.log("Logged in user:", req.user.email);
    console.log("User role:", req.user.role);
    console.log("User ID:", req.user._id);
    console.log("================================");

    // Continue to protected route
    next();

  } catch (error) {
    console.log("JWT Error:", error.message);

    return res.status(401).json({
      message: "Not authorized, token failed",
    });
  }
};

module.exports = protect;