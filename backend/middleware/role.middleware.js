const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    // Check if user exists
    if (!req.user) {
      return res.status(401).json({
        message: "Not authorized"
      });
    }

    // Check if user's role is allowed
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied. You do not have permission."
      });
    }

    // User has permission
    next();
  };
};

module.exports = authorize;