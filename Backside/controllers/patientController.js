const express = require("express");
const router = express.Router();

// Add a new patient
router.post("/patients", async (req, res) => {
  try {
    const { name, gender, age, email, phone } = req.body;
    const patient = new Patient({ name, gender, age, email, phone });
    await patient.save();
    res.status(201).json({ message: "Patient added", patient });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add patient", error: err.message });
  }
});

// Get all patients (from Patient collection and User collection with role 'patient')
router.get("/patients", async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });
    const User = require("../models/User");
    const userPatients = await User.find({ role: "patient" }).select(
      "name email phone town region"
    );
    // Merge and deduplicate by email
    const allPatients = [...patients, ...userPatients].filter(
      (pat, idx, arr) => arr.findIndex((p) => p.email === pat.email) === idx
    );
    res.json(allPatients);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch patients", error: err.message });
  }
});

// Update patient
router.put("/patients/:id", async (req, res) => {
  try {
    const { name, gender, age, email, phone } = req.body;
    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      { name, gender, age, email, phone },
      { new: true }
    );
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.json({ message: "Patient updated", patient });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update patient", error: err.message });
  }
});

// Delete patient
router.delete("/patients/:id", async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.json({ message: "Patient deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete patient", error: err.message });
  }
});

module.exports = router;
