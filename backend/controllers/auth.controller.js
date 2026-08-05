const User = require("../models/User");
const VerifierRequest = require("../models/VerifierRequest");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

// ==========================================
// GOOGLE CLIENT
// ==========================================

const googleClient = new OAuth2Client(
process.env.GOOGLE_CLIENT_ID
);

// ==========================================
// GENERATE JWT TOKEN
// ==========================================

const generateToken = (user) => {
return jwt.sign(
{
userId: user._id,
role: user.role
},
process.env.JWT_SECRET,
{
expiresIn: process.env.JWT_EXPIRES_IN
}
);
};

// ==========================================
// USER RESPONSE
// ==========================================

const getUserResponse = (user) => {
return {
_id: user._id,
name: user.name,
email: user.email,
role: user.role,
college: user.college,
degree: user.degree,
batch: user.batch,
verified: user.verified,
authProvider: user.authProvider
};
};

// ==========================================
// REGISTER USER
// ==========================================

const registerUser = async (req, res) => {
try {
const {
name,
email,
password,
role,
college,
degree,
batch
} = req.body;


// ==========================================
// CHECK REQUIRED FIELDS
// ==========================================

if (!name || !email || !password) {
  return res.status(400).json({
    message: "Name, email and password are required"
  });
}

// ==========================================
// CHECK IF USER ALREADY EXISTS
// ==========================================

const existingUser = await User.findOne({ email });

if (existingUser) {
  return res.status(400).json({
    message: "User with this email already exists"
  });
}

// ==========================================
// HASH PASSWORD
// ==========================================

const hashedPassword = await bcrypt.hash(
  password,
  10
);

// ==========================================
// VERIFIER REGISTRATION
// ==========================================

if (role === "verifier") {
  // Create user as student initially
  // User becomes verifier after admin approval

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "student",
    college,
    degree,
    batch,
    verified: false,
    authProvider: "password"
  });

  // Create verifier request

  await VerifierRequest.create({
    organizationName: college,
    email,
    status: "pending"
  });

  // Send response

  return res.status(201).json({
    message:
      "Registration successful. Your verifier request is pending admin approval.",
    user: getUserResponse(user)
  });
}

// ==========================================
// STUDENT REGISTRATION
// ==========================================

const user = await User.create({
  name,
  email,
  password: hashedPassword,
  role: "student",
  college,
  degree,
  batch,
  verified: true,
  authProvider: "password"
});

// ==========================================
// SEND STUDENT RESPONSE
// ==========================================

return res.status(201).json({
  message: "User registered successfully",
  user: getUserResponse(user)
});


} catch (error) {
console.error("Registration error:", error);


return res.status(500).json({
  message: "Registration failed",
  error: error.message
});


}
};

// ==========================================
// LOGIN USER
// ==========================================

const loginUser = async (req, res) => {
try {
const {
email,
password
} = req.body;


// ==========================================
// FIND USER
// ==========================================

const user = await User.findOne({ email });

if (!user) {
  return res.status(404).json({
    message: "User not found"
  });
}

// ==========================================
// CHECK IF USER IS BLOCKED
// ==========================================

if (user.blocked) {
  return res.status(403).json({
    message:
      "Your account has been blocked by the administrator."
  });
}


// ==========================================
// CHECK PASSWORD
// ==========================================

if (!user.password) {
  return res.status(400).json({
    message:
      "This account uses Google Login. Please continue with Google."
  });
}

const isPasswordCorrect = await bcrypt.compare(
  password,
  user.password
);

if (!isPasswordCorrect) {
  return res.status(401).json({
    message: "Invalid email or password"
  });
}

// ==========================================
// CHECK PENDING VERIFIER REQUEST
// ==========================================

if (
  user.role === "student" &&
  user.verified === false
) {
  const verifierRequest =
    await VerifierRequest.findOne({
      email: user.email,
      status: "pending"
    });

  if (verifierRequest) {
    return res.status(403).json({
      message:
        "Your verifier request is still pending admin approval."
    });
  }
}

// ==========================================
// GENERATE JWT
// ==========================================

const token = generateToken(user);

// ==========================================
// SEND LOGIN RESPONSE
// ==========================================

return res.status(200).json({
  message: "Login successful",
  token,
  user: getUserResponse(user)
});


} catch (error) {
console.error("Login error:", error);


return res.status(500).json({
  message: "Login failed",
  error: error.message
});


}
};

// ==========================================
// GOOGLE LOGIN
// ==========================================

const googleLogin = async (req, res) => {
try {
const {
credential
} = req.body;


// ==========================================
// CHECK CREDENTIAL
// ==========================================

if (!credential) {
  return res.status(400).json({
    message: "Google credential is required"
  });
}

// ==========================================
// VERIFY GOOGLE TOKEN
// ==========================================

const ticket =
  await googleClient.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID
  });

// ==========================================
// GET GOOGLE USER DATA
// ==========================================

const payload = ticket.getPayload();

const {
  sub: googleId,
  name,
  email,
  email_verified
} = payload;

// ==========================================
// CHECK EMAIL
// ==========================================

if (!email_verified) {
  return res.status(400).json({
    message: "Google email is not verified"
  });
}

// ==========================================
// FIND EXISTING USER
// ==========================================

let user = await User.findOne({ email });

// ==========================================
// EXISTING USER
// ==========================================

if (user) {
  if (!user.googleId) {
    user.googleId = googleId;
  }

  if (user.authProvider !== "google") {
    user.authProvider = "google";
  }

  user.verified = true;

  await user.save();
}

// ==========================================
// NEW GOOGLE USER
// ==========================================

else {
  user = await User.create({
    name,
    email,
    googleId,
    authProvider: "google",
    role: "student",
    verified: true
  });
}

// ==========================================
// GENERATE JWT
// ==========================================

const token = generateToken(user);

// ==========================================
// SEND RESPONSE
// ==========================================

return res.status(200).json({
  message: "Google login successful",
  token,
  user: getUserResponse(user)
});


} catch (error) {
console.error("Google login error:", error);


return res.status(500).json({
  message: "Google login failed",
  error: error.message
});


}
};

// ==========================================
// EXPORT FUNCTIONS
// ==========================================

module.exports = {
registerUser,
loginUser,
googleLogin
};
