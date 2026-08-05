const Certificate = require("../models/Certificate");
const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");

// ==========================================
// GET PENDING CERTIFICATES FOR THIS VERIFIER
// ==========================================
const getPendingCertificates = async (req, res) => {
try {
const certificates = await Certificate.find({
verifierEmail: req.user.email,
status: "pending"
}).populate(
"student",
"name email college degree batch"
);


res.status(200).json({
  message: "Pending certificates fetched successfully",
  certificates
});


} catch (error) {
console.error("Get pending certificates error:", error);


res.status(500).json({
  message: "Failed to fetch pending certificates",
  error: error.message
});


}
};

// ==========================================
// APPROVE / REJECT CERTIFICATE
// ==========================================
const updateCertificateStatus = async (req, res) => {
try {


console.log("Request Body:", req.body);
console.log("Request Params:", req.params);

const { id } = req.params;
const { status, comments } = req.body;


// ==========================================
// VALIDATE STATUS
// ==========================================

if (
  !status ||
  !["approved", "rejected"].includes(status)
) {
  return res.status(400).json({
    message: "Status must be approved or rejected"
  });
}


// ==========================================
// FIND CERTIFICATE
// ==========================================

const certificate =
  await Certificate.findById(id);

if (!certificate) {
  return res.status(404).json({
    message: "Certificate not found"
  });
}


// ==========================================
// CHECK VERIFIER AUTHORIZATION
// ==========================================

if (
  certificate.verifierEmail !==
  req.user.email
) {
  return res.status(403).json({
    message:
      "You are not authorized to verify this certificate"
  });
}


// ==========================================
// FIND VERIFIER USER
// ==========================================

const verifier =
  await User.findOne({
    email: req.user.email
  });


// ==========================================
// UPDATE CERTIFICATE STATUS
// ==========================================

certificate.status =
  status;

certificate.comments =
  comments || "";


// ==========================================
// APPROVED CERTIFICATE
// ==========================================

if (status === "approved") {

  // Generate public link only once
  if (!certificate.publicLinkId) {

    certificate.publicLinkId =
      uuidv4();

  }


  // Save verifier name
  certificate.verifierName =
    verifier
      ? verifier.name
      : req.user.email;


  // Save verification date and time
  certificate.verifiedAt =
    new Date();

}


// ==========================================
// REJECTED CERTIFICATE
// ==========================================

if (status === "rejected") {

  certificate.verifiedAt =
    null;

}


// ==========================================
// SAVE CERTIFICATE
// ==========================================

await certificate.save();


// ==========================================
// SEND RESPONSE
// ==========================================

res.status(200).json({

  message:
    `Certificate ${status} successfully`,

  certificate

});


} catch (error) {


console.error(
  "Update certificate status error:",
  error
);

res.status(500).json({

  message:
    "Failed to update certificate status",

  error:
    error.message

});


}
};

// ==========================================
// EXPORT
// ==========================================

module.exports = {
getPendingCertificates,
updateCertificateStatus
};
