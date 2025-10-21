const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail } = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ msg: "Semua field wajib diisi" });

    const hashed = await bcrypt.hash(password, 10);
    await createUser(email, hashed);

    res.json({ msg: "Registrasi berhasil" });
  } catch (err) {
    res.status(500).json({ msg: "Terjadi kesalahan server", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) return res.status(401).json({ msg: "User tidak ditemukan" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ msg: "Password salah" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, { httpOnly: true });
    res.json({ msg: "Login berhasil" });
  } catch (err) {
    res.status(500).json({ msg: "Terjadi kesalahan server", error: err.message });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({ msg: "Logout berhasil" });
};
