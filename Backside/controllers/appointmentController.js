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

module.exports = router;
