const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

const MONGODB_URI =
  "mongodb+srv://bururik:Scripter0550@cluster0.ra9m2xc.mongodb.net/MedicalApp?retryWrites=true&w=majority";

const authRoutes = require("./routes/authRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });
