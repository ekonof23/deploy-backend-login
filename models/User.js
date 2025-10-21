const db = require("../config/db");

exports.createUser = async (email, password) => {
  const [result] = await db.query(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, password]
  );
  return result;
};

exports.findUserByEmail = async (email) => {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
};
