const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./controllers/authController");
const appointmentRoutes = require("./controllers/appointmentController");
const doctorRoutes = require("./controllers/doctorController");
const patientRoutes = require("./controllers/patientController");
const patientCountRoutes = require('./routes/patientCount');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Use your MongoDB Atlas connection string for mongoose
mongoose
  .connect(
    "mongodb+srv://Akeem:Akem1010@cluster0.kp8ymrh.mongodb.net/hospitaldb?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to Mongodb");
  })
  .catch((err) => {
    console.error("Failed to connect to Mongodb", err);
  });

app.use("/api", authRoutes);
app.use("/api", appointmentRoutes);
app.use("/api", doctorRoutes);
app.use("/api", patientRoutes);
app.use("/api/patients", patientCountRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
