const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET /api/patients/count - total patients (patients collection + users with role 'patient')
router.get("/count", async (req, res) => {
  try {
    const usersCount = await User.countDocuments({ role: "patient" });
    res.json({ count: usersCount });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
