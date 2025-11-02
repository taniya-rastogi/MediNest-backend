const multer = require("multer");
const path = require("path");

// Temporary upload folder (will auto-delete after Cloudinary upload)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "tempUploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// File Filter (allow only images)
const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/jpg", "image/png"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG/PNG images allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });
module.exports = upload;
