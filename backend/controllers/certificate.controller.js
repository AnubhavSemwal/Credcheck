const Certificate = require("../models/Certificate");
const QRCode = require("qrcode");
const cloudinary = require("../config/cloudinary");
const transporter = require("../config/email");


// ==========================================
// UPLOAD BUFFER TO CLOUDINARY
// ==========================================
const uploadToCloudinary = (buffer, options) => {

  return new Promise((resolve, reject) => {

    const uploadStream =
      cloudinary.uploader.upload_stream(
        options,
        (error, result) => {

          if (error) {
            reject(error);
          } else {
            resolve(result);
          }

        }
      );

    // Send the original file buffer directly
    // to Cloudinary
    uploadStream.end(buffer);

  });

};


// ==========================================
// CREATE CERTIFICATE WITH FILE
// ==========================================
const createCertificate = async (req, res) => {

  try {

    const {
      title,
      organization,
      verifierEmail,
      issueDate
    } = req.body;


    // ==========================================
    // CHECK FILE
    // ==========================================

    if (!req.file) {

      return res.status(400).json({
        message:
          "Please upload a certificate file"
      });

    }


    // ==========================================
    // CHECK FILE TYPE
    // ==========================================

    const isPDF =
      req.file.mimetype ===
      "application/pdf";


    const isImage =
      req.file.mimetype ===
        "image/jpeg" ||
      req.file.mimetype ===
        "image/jpg" ||
      req.file.mimetype ===
        "image/png";


    if (!isPDF && !isImage) {

      return res.status(400).json({

        message:
          "Only PDF, JPG, JPEG and PNG files are allowed"

      });

    }


    // ==========================================
    // CLEAN ORIGINAL FILE NAME
    // ==========================================

    const originalName =
      req.file.originalname
        .replace(/\.[^/.]+$/, "")
        .replace(/[^a-zA-Z0-9_-]/g, "_");


    // ==========================================
    // COMMON CLOUDINARY OPTIONS
    // ==========================================

    let uploadOptions = {

      folder:
        "credcheck/certificates",

      use_filename:
        true,

      unique_filename:
        true

    };


    // ==========================================
    // PDF UPLOAD SETTINGS
    // ==========================================

    if (isPDF) {

      uploadOptions = {

        ...uploadOptions,

        resource_type:
          "raw",

        public_id:
          `${originalName}.pdf`

      };

    }


    // ==========================================
    // IMAGE UPLOAD SETTINGS
    // ==========================================

    if (isImage) {

      uploadOptions = {

        ...uploadOptions,

        resource_type:
          "image"

      };

    }


    // ==========================================
    // UPLOAD FILE TO CLOUDINARY
    // ==========================================

    console.log(
      "Uploading certificate:",
      req.file.originalname
    );


    const uploadResult =
      await uploadToCloudinary(
        req.file.buffer,
        uploadOptions
      );


    console.log(
      "Cloudinary upload successful:"
    );


    console.log(
      uploadResult.secure_url
    );


    // ==========================================
    // SAVE CERTIFICATE IN MONGODB
    // ==========================================

    const certificate =
      await Certificate.create({

        student:
          req.user._id,

        title,

        organization,

        verifierEmail,

        issueDate,

        fileUrl:
          uploadResult.secure_url

      });


    // ==========================================
    // SEND VERIFICATION EMAIL TO VERIFIER
    // ==========================================

  /*  try {

      await transporter.sendMail({

        from:
          `"CredCheck" <${process.env.EMAIL_USER}>`,

        to:
          verifierEmail,

        subject:
          "Certificate Verification Request - CredCheck",

        html: `

          <div
            style="
              font-family: Arial, sans-serif;
              line-height: 1.6;
              max-width: 600px;
              margin: auto;
              padding: 20px;
            "
          >

            <h2 style="color: #2563eb;">
              CredCheck Certificate Verification Request
            </h2>

            <p>
              Hello,
            </p>

            <p>
              A student has submitted a certificate
              for verification through the CredCheck platform.
            </p>

            <h3>
              Certificate Details
            </h3>

            <p>
              <strong>
                Certificate Title:
              </strong>

              ${title}
            </p>

            <p>
              <strong>
                Organization:
              </strong>

              ${organization}
            </p>

            <p>
              <strong>
                Issue Date:
              </strong>

              ${issueDate || "Not provided"}
            </p>

            <p>
              Please login to your CredCheck verifier
              dashboard to review and verify this certificate.
            </p>

            <p>
              Thank you,
            </p>

            <p>
              <strong>
                CredCheck Team
              </strong>
            </p>

          </div>

        `

      });


      console.log(
        "Verification email sent successfully to:",
        verifierEmail
      );


    } catch (emailError) {

      console.error(
        "Failed to send verification email:",
        emailError.message
      );

    }
*/
// ==========================================
// SEND VERIFICATION EMAIL TO VERIFIER
// ==========================================

try {

  console.log("========== EMAIL DEBUG ==========");
  console.log("Using Gmail :", process.env.EMAIL_USER);
  console.log("Sending To  :", verifierEmail);
  console.log("===============================");

  const info = await transporter.sendMail({

    from: process.env.EMAIL_USER,

    to: verifierEmail,

    subject: "CredCheck - Certificate Verification Request",

    text: `
Hello,

A student has submitted a certificate for verification.

Certificate Title : ${title}
Organization      : ${organization}
Issue Date        : ${issueDate || "Not Provided"}

Please login to CredCheck and review the certificate.

Regards,
CredCheck Team
`

  });

  console.log("✅ Email Sent Successfully");
  console.log("Message ID :", info.messageId);
  console.log("Accepted   :", info.accepted);
  console.log("Rejected   :", info.rejected);

} catch (emailError) {

  console.error("❌ EMAIL ERROR");
  console.error(emailError);

}
    // ==========================================
    // SEND RESPONSE
    // ==========================================

    res.status(201).json({

      message:
        "Certificate submitted successfully",

      certificate

    });


  } catch (error) {

    console.error(
      "Certificate upload error:",
      error
    );


    res.status(500).json({

      message:
        "Certificate submission failed",

      error:
        error.message

    });

  }

};


// ==========================================
// GET MY CERTIFICATES
// ==========================================
const getMyCertificates = async (
  req,
  res
) => {

  try {

    const certificates =
      await Certificate.find({

        student:
          req.user._id

      }).sort({

        createdAt:
          -1

      });


    res.status(200).json({

      message:
        "Certificates fetched successfully",

      certificates

    });


  } catch (error) {

    console.error(
      "Fetch certificates error:",
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
// PUBLIC CERTIFICATE VERIFICATION
// ==========================================
const getPublicCertificate = async (
  req,
  res
) => {

  try {

    const {
      publicLinkId
    } = req.params;


    const certificate =
      await Certificate.findOne({

        publicLinkId,

        status:
          "approved"

      }).populate(

        "student",

        "name email college degree batch"

      );


    if (!certificate) {

      return res.status(404).json({

        verified:
          false,

        message:
          "Certificate not found or not approved"

      });

    }


    res.status(200).json({

      verified:
        true,

      certificate

    });


  } catch (error) {

    console.error(
      "Certificate verification error:",
      error
    );


    res.status(500).json({

      message:
        "Failed to verify certificate",

      error:
        error.message

    });

  }

};


// ==========================================
// GENERATE QR CODE
// ==========================================
const generateCertificateQR = async (
  req,
  res
) => {

  try {

    const {
      publicLinkId
    } = req.params;


    const certificate =
      await Certificate.findOne({

        publicLinkId,

        status:
          "approved"

      });


    if (!certificate) {

      return res.status(404).json({

        message:
          "Approved certificate not found"

      });

    }


    // ==========================================
    // PUBLIC REACT VERIFICATION URL
    // ==========================================

    const verificationUrl =
      `http://localhost:5173/cert/${publicLinkId}`;


    // ==========================================
    // GENERATE QR CODE
    // ==========================================

    const qrCode =
      await QRCode.toDataURL(
        verificationUrl
      );


    // ==========================================
    // SEND QR RESPONSE
    // ==========================================

    res.status(200).json({

      message:
        "QR code generated successfully",

      verificationUrl,

      qrCode

    });


  } catch (error) {

    console.error(
      "QR generation error:",
      error
    );


    res.status(500).json({

      message:
        "Failed to generate QR code",

      error:
        error.message

    });

  }

};


// ==========================================
// EXPORT FUNCTIONS
// ==========================================
module.exports = {

  createCertificate,

  getMyCertificates,

  getPublicCertificate,

  generateCertificateQR

};