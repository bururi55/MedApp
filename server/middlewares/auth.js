const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Получение токена из заголовка
  const token = req.header("Authorization")?.replace("Bearer ", "");

  // Проверка наличия токена
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  // Проверка токена
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );
    req.user = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
