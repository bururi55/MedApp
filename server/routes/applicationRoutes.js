const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const auth = require("../middlewares/auth");

// Получение всех заявок
router.get("/", auth, async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    console.error("Ошибка при получении заявок:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

// Создание заявки
router.post("/", async (req, res) => {
  try {
    const { fullName, phone, problemDescription } = req.body;

    const newApplication = new Application({
      fullName,
      phone,
      problemDescription,
    });

    const savedApplication = await newApplication.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    console.error("Ошибка при создании заявки:", error);
    res.status(400).json({ message: "Ошибка при создании заявки" });
  }
});

module.exports = router;
