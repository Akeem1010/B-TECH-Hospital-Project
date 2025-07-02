const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  town: String,
  region: String,
  patientOf: String,
});

module.exports = mongoose.model("User", userSchema);
