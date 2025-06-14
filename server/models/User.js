const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Хэширование пароля перед сохранением
UserSchema.pre("save", async function (next) {
  // Проверяем, изменялся ли пароль
  if (!this.isModified("password")) {
    return next();
  }

  try {
    // Генерируем соль
    const salt = await bcrypt.genSalt(10);
    // Хэшируем пароль
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("User", UserSchema);
