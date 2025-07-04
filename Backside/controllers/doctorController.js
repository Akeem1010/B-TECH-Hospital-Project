const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");

// Add a new doctor
router.post("/doctors", async (req, res) => {
  try {
    const { name, specialty, bio, image } = req.body;
    const doctor = new Doctor({ name, specialty, bio, image });
    await doctor.save();
    res.status(201).json({ message: "Doctor added", doctor });
  } catch (err) {
    res
      .status(500)
      .json({ message: "failed to add doctor", error: err.message });
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

// Update doctor
router.put("/doctors/:id", async (req, res) => {
  try {
    const { name, specialty, bio, image, email, phone } = req.body;
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { name, specialty, bio, image, email, phone },
      { new: true }
    );
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

module.exports = router;
