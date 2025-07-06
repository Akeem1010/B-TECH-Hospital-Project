const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// POST: Add a new message (from contact form)
router.post("/messages", async (req, res) => {
  try {
    const { from, email, subject, content } = req.body;
    if (!from || !email || !subject || !content) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const message = new Message({ from, email, subject, content });
    await message.save();
    res.status(201).json({ message: "Message sent", messageObj: message });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to send message", error: err.message });
  }
});

// GET: Get all messages (for admin panel)
router.get("/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ date: -1 });
    res.json(messages);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch messages", error: err.message });
  }
});

// GET: Get 3 most recent messages (for admin panel)
router.get("/messages/recent", async (req, res) => {
  try {
    const messages = await Message.find().sort({ date: -1 }).limit(3);
    res.json(messages);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch recent messages", error: err.message });
  }
});

module.exports = router;
