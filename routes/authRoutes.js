const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/authController");
const rateLimit = require("express-rate-limit");

// Rate limiter khusus login
const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 5, 
  message: "Terlalu banyak percobaan login, coba lagi nanti",
  standardHeaders: true,
  legacyHeaders: false,
});

// Routes
router.post("/register", register);
router.post("/login", loginLimiter, login);
router.post("/logout", logout);

module.exports = router;

