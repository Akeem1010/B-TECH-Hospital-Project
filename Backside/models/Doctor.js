const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  bio: { type: String }, // About field
  image: { type: String }, // Image URL or path
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Doctor", DoctorSchema);
