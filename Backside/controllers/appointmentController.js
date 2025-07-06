const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// Create appointment
router.post("/appointments", async (req, res) => {
  try {
    const { patientName, doctorName, date, time, details } = req.body;
    const appointment = new Appointment({
      patientName,
      doctorName,
      date,
      time,
      details,
    });
    await appointment.save();
    res.status(201).json({ message: "Appointment booked", appointment });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to book appointment", error: err.message });
  }
});

// Get all appointments
router.get("/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json(appointments);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch appointments", error: err.message });
  }
});

// Get 3 most recent appointments
router.get("/appointments/recent", async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .sort({ createdAt: -1 })
      .limit(3);
    res.json(appointments);
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Failed to fetch recent appointments",
        error: err.message,
      });
  }
});

// Delete appointment
router.delete("/appointments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Appointment.findByIdAndDelete(id);
    if (!deleted)
      return res.status(404).json({ message: "Appointment not found" });
    res.json({ message: "Appointment deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete appointment", error: err.message });
  }
});

// Update appointment status
router.patch("/appointments/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) return res.status(400).json({ message: "Status is required" });
    const updated = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ message: "Appointment not found" });
    res.json({ message: "Status updated", appointment: updated });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update status", error: err.message });
  }
});

module.exports = router;
