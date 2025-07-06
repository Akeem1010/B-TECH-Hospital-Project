const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");
const upload = require("../middleware/multer");
const cloudinary = require("../config/cloudinary");

// Add a new doctor (with image upload to Cloudinary, memory buffer)
router.post("/doctors", upload.single("image"), async (req, res) => {
  try {
    const { name, specialty, bio, email, phone } = req.body;
    let imageUrl;
    if (req.file) {
      // Upload buffer to Cloudinary using a Promise
      const uploadPromise = new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "doctors" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          }
        );
        stream.end(req.file.buffer);
      });
      imageUrl = await uploadPromise;
    }
    const doctor = new Doctor({
      name,
      specialty,
      bio,
      email,
      phone,
      image: imageUrl,
    });
    await doctor.save();
    res.status(201).json({ message: "Doctor added", doctor });
  } catch (err) {
    console.error("Doctor creation error:", err); // Log full error for debugging
    res
      .status(500)
      .json({
        message: "failed to add doctor",
        error: err.message,
        stack: err.stack,
      });
  }
});

// Get all doctors
router.get("/doctors", async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 });
    res.json(doctors);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch doctors", error: err.message });
  }
});

// Update doctor (with image upload to Cloudinary, memory buffer)
router.put("/doctors/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, specialty, bio, email, phone } = req.body;
    const update = { name, specialty, bio, email, phone };
    if (req.file) {
      const uploadPromise = new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "doctors" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          }
        );
        stream.end(req.file.buffer);
      });
      update.image = await uploadPromise;
    }
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json({ message: "Doctor updated", doctor });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update doctor", error: err.message });
  }
});

// Delete doctor
router.delete("/doctors/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json({ message: "Doctor deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete doctor", error: err.message });
  }
});

// Messages section (fetch and display messages from backend)
// This is a backend controller file, so no frontend code here. Ensure the /api/messages route is handled in your main app and the controller is implemented.
// If you need to add a route here for messages, import the Message model and add the following:
/*
const Message = require("../models/Message");

// Get all messages
router.get("/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch messages", error: err.message });
  }
});
*/

module.exports = router;
