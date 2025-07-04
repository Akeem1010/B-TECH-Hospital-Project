const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");

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

// Get all patients
router.get("/patients", async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });
    res.json(patients);
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
