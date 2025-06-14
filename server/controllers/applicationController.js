const Application = require("../models/Application");

// Получение всех заявок
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

// Создание заявки
exports.createApplication = async (req, res) => {
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
    res.status(400).json({ message: "Ошибка при создании заявки" });
  }
};
