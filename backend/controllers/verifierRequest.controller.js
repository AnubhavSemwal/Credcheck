const VerifierRequest = require("../models/VerifierRequest");
const User = require("../models/User");
const transporter = require("../config/email");

// ===============================
// CREATE VERIFIER REQUEST
// ===============================

const createVerifierRequest = async (req, res) => {
try {
const {
organizationName,
email
} = req.body;


// Check if request already exists
const existingRequest =
  await VerifierRequest.findOne({ email });

if (existingRequest) {
  return res.status(400).json({
    message:
      "A verifier request with this email already exists."
  });
}

// Create verifier request
const verifierRequest =
  await VerifierRequest.create({
    organizationName,
    email,
    status: "pending"
  });

return res.status(201).json({
  message:
    "Verifier request submitted successfully",
  verifierRequest
});


} catch (error) {
console.error(
"Create verifier request error:",
error
);


return res.status(500).json({
  message:
    "Verifier request failed",
  error:
    error.message
});


}
};

// ===============================
// GET ALL VERIFIER REQUESTS
// ADMIN ONLY
// ===============================

const getVerifierRequests = async (req, res) => {
try {
const verifierRequests =
await VerifierRequest.find();


return res.status(200).json({
  message:
    "Verifier requests fetched successfully",
  verifierRequests
});


} catch (error) {
console.error(
"Get verifier requests error:",
error
);


return res.status(500).json({
  message:
    "Failed to fetch verifier requests",
  error:
    error.message
});


}
};

// ===============================
// UPDATE VERIFIER REQUEST STATUS
// ADMIN ONLY
// ===============================

const updateVerifierRequestStatus = async (req, res) => {
try {
const { status } = req.body;


// Validate status
if (
  !["approved", "rejected", "pending"].includes(status)
) {
  return res.status(400).json({
    message:
      "Invalid status value. Must be 'approved', 'rejected', or 'pending'."
  });
}

// Find verifier request
const verifierRequest =
  await VerifierRequest.findById(req.params.id);

if (!verifierRequest) {
  return res.status(404).json({
    message:
      "Verifier request not found"
  });
}

// Update request status
verifierRequest.status = status;

await verifierRequest.save();


// ==========================================
// APPROVED
// ==========================================

if (status === "approved") {

  // Find existing user
  let user =
    await User.findOne({
      email:
        verifierRequest.email
    });

  // If user exists
  if (user) {

    user.role = "verifier";

    user.verified = true;

    await user.save();

  }

  // If user does not exist
  else {

    user =
      await User.create({
        name:
          verifierRequest.organizationName,

        email:
          verifierRequest.email,

        role:
          "verifier",

        verified:
          true
      });

  }


  // ==========================================
  // SEND APPROVAL EMAIL
  // ==========================================

  try {

    await transporter.sendMail({

      from:
        process.env.EMAIL_USER,

      to:
        verifierRequest.email,

      subject:
        "CredCheck - Verifier Account Approved",

      text:


`Hello,

Your verifier request for CredCheck has been approved.

Your account has now been approved as a verifier.

You can now log in to CredCheck and access the Verifier Dashboard.

Thank you,
CredCheck Team`


    });

    console.log(
      "Approval email sent successfully to:",
      verifierRequest.email
    );

  } catch (emailError) {

    console.error(
      "Approval email failed:",
      emailError.message
    );

  }
}


// ==========================================
// REJECTED
// ==========================================

if (status === "rejected") {

  try {

    await transporter.sendMail({

      from:
        process.env.EMAIL_USER,

      to:
        verifierRequest.email,

      subject:
        "CredCheck - Verifier Request Rejected",

      text:


`Hello,

Your verifier request for CredCheck has been rejected by the CredCheck administrator.

If you believe this was a mistake, please contact the CredCheck administration team.

Thank you,
CredCheck Team`


    });

    console.log(
      "Rejection email sent successfully to:",
      verifierRequest.email
    );

  } catch (emailError) {

    console.error(
      "Rejection email failed:",
      emailError.message
    );

  }
}


// ==========================================
// SEND RESPONSE
// ==========================================

return res.status(200).json({

  message:
    `Verifier request ${status} successfully`,

  verifierRequest

});


} catch (error) {


console.error(
  "Update verifier request error:",
  error
);

return res.status(500).json({

  message:
    "Failed to update verifier request",

  error:
    error.message

});


}
};

// ===============================
// EXPORT FUNCTIONS
// ===============================

module.exports = {

createVerifierRequest,

getVerifierRequests,

updateVerifierRequestStatus

};
