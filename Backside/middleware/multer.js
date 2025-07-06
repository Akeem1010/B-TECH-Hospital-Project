// Multer config is still needed for parsing multipart/form-data, but local file is deleted after Cloudinary upload
const multer = require("multer");

// Use memory storage for Multer (no local file written)
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;
