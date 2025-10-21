const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000; // fallback ke 5000 jika dijalankan lokal
app.listen(PORT, () =>
  console.log(`✅ Server berjalan di port ${PORT}`)
);
