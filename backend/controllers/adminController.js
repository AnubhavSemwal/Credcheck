const User = require("../models/User");
const Certificate = require("../models/Certificate");
const VerifierRequest = require("../models/VerifierRequest");


// ==========================================
// GET ADMIN DASHBOARD STATISTICS
// ==========================================
const getAdminStats = async (req, res) => {
  try {

    const totalStudents = await User.countDocuments({
      role: "student"
    });

    const totalVerifiers = await User.countDocuments({
      role: "verifier"
    });

    const totalCertificates =
      await Certificate.countDocuments();

    const pendingCertificates =
      await Certificate.countDocuments({
        status: "pending"
      });

    const approvedCertificates =
      await Certificate.countDocuments({
        status: "approved"
      });

    const rejectedCertificates =
      await Certificate.countDocuments({
        status: "rejected"
      });


    res.status(200).json({

      message:
        "Admin statistics fetched successfully",

      stats: {
        totalStudents,
        totalVerifiers,
        totalCertificates,
        pendingCertificates,
        approvedCertificates,
        rejectedCertificates
      }

    });

  } catch (error) {

    console.error(
      "Admin stats error:",
      error
    );

    res.status(500).json({

      message:
        "Failed to fetch admin statistics",

      error:
        error.message

    });

  }
};


// ==========================================
// GET ALL STUDENTS
// ==========================================
const getAllStudents = async (req, res) => {
  try {

    const students =
      await User.find({
        role: "student"
      })
        .select("-password")
        .sort({
          createdAt: -1
        });


    res.status(200).json({

      message:
        "Students fetched successfully",

      students

    });

  } catch (error) {

    console.error(
      "Get students error:",
      error
    );

    res.status(500).json({

      message:
        "Failed to fetch students",

      error:
        error.message

    });

  }
};


// ==========================================
// GET ALL VERIFIERS
// ==========================================
const getAllVerifiers = async (req, res) => {
  try {

    const verifiers =
      await User.find({
        role: "verifier"
      })
        .select("-password")
        .sort({
          createdAt: -1
        });


    res.status(200).json({

      message:
        "Verifiers fetched successfully",

      verifiers

    });

  } catch (error) {

    console.error(
      "Get verifiers error:",
      error
    );

    res.status(500).json({

      message:
        "Failed to fetch verifiers",

      error:
        error.message

    });

  }
};


// ==========================================
// GET ALL CERTIFICATES
// ==========================================
const getAllCertificates = async (
  req,
  res
) => {
  try {

    const certificates =
      await Certificate.find()
        .populate(
          "student",
          "name email college degree batch"
        )
        .sort({
          createdAt: -1
        });


    res.status(200).json({

      message:
        "Certificates fetched successfully",

      certificates

    });

  } catch (error) {

    console.error(
      "Get certificates error:",
      error
    );

    res.status(500).json({

      message:
        "Failed to fetch certificates",

      error:
        error.message

    });

  }
};


// ==========================================
// GET ALL VERIFIER REQUESTS
// ==========================================
const getAllVerifierRequests = async (
  req,
  res
) => {
  try {

    const requests =
      await VerifierRequest.find()
        .sort({
          createdAt: -1
        });


    res.status(200).json({

      message:
        "Verifier requests fetched successfully",

      requests

    });

  } catch (error) {

    console.error(
      "Get verifier requests error:",
      error
    );

    res.status(500).json({

      message:
        "Failed to fetch verifier requests",

      error:
        error.message

    });

  }
};


// ==========================================
// APPROVE VERIFIER REQUEST
// ==========================================
const approveVerifierRequest = async (
  req,
  res
) => {
  try {

    const { id } = req.params;


    const request =
      await VerifierRequest.findById(id);


    if (!request) {

      return res.status(404).json({

        message:
          "Verifier request not found"

      });

    }


    // Change request status
    request.status = "approved";


    await request.save();


    res.status(200).json({

      message:
        "Verifier request approved successfully",

      request

    });

  } catch (error) {

    console.error(
      "Approve verifier request error:",
      error
    );

    res.status(500).json({

      message:
        "Failed to approve verifier request",

      error:
        error.message

    });

  }
};


// ==========================================
// REJECT VERIFIER REQUEST
// ==========================================
const rejectVerifierRequest = async (
  req,
  res
) => {
  try {

    const { id } = req.params;


    const request =
      await VerifierRequest.findById(id);


    if (!request) {

      return res.status(404).json({

        message:
          "Verifier request not found"

      });

    }


    // Change request status
    request.status = "rejected";


    await request.save();


    res.status(200).json({

      message:
        "Verifier request rejected successfully",

      request

    });

  } catch (error) {

    console.error(
      "Reject verifier request error:",
      error
    );

    res.status(500).json({

      message:
        "Failed to reject verifier request",

      error:
        error.message

    });

  }
};
// ==========================================
// TOGGLE TRUSTED ORGANIZATION
// ==========================================

const toggleTrustedOrganization = async (req, res) => {

  try {

    const certificate = await Certificate.findById(req.params.id);

    if (!certificate) {

      return res.status(404).json({
        message: "Certificate not found"
      });

    }

    certificate.trustedOrganization =
      !certificate.trustedOrganization;

    await certificate.save();

    res.status(200).json({

      message: "Trusted organization updated successfully.",

      certificate

    });

  }

  catch (error) {

    console.error(error);

    res.status(500).json({

      message: "Failed to update trusted organization.",

      error: error.message

    });

  }

};
// ==========================================
// DELETE USER
// ==========================================

const deleteUser = async (req, res) => {

  try {

    const user = await User.findById(req.params.id);

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "User deleted successfully."
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to delete user.",
      error: error.message
    });

  }

};
// ==========================================
// BLOCK / UNBLOCK USER
// ==========================================

const toggleBlockUser = async (req, res) => {

  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found."
      });
    }

    user.blocked = !user.blocked;

    await user.save();

    res.status(200).json({
      message: user.blocked
        ? "User blocked successfully."
        : "User unblocked successfully.",
      user
    });

  } catch (error) {

    console.error(
      "Toggle block user error:",
      error
    );

    res.status(500).json({
      message: "Failed to update user status.",
      error: error.message
    });

  }

};



// ==========================================
// EXPORT ALL CONTROLLERS
// ==========================================
module.exports = {

  // Dashboard
  getAdminStats,

  // Users
  getAllStudents,
  getAllVerifiers,

  // Certificates
  getAllCertificates,

  // Verifier Requests
  getAllVerifierRequests,
  approveVerifierRequest,
  rejectVerifierRequest,
  toggleTrustedOrganization,
   deleteUser,
   toggleBlockUser

};