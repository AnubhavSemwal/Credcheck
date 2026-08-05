const multer = require("multer");

// Store uploaded file temporarily in memory
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,

  limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB
  },

  fileFilter: (req, file, cb) => {

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg"
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only PDF, JPG, JPEG and PNG files are allowed"
        )
      );
    }

  }
});

module.exports = upload;