const express = require("express");
const admin = require("./config/firebase-admin");
const routes = require("./routes");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Route'lardan önce bunu ekleyin
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Firebase Auth Middleware
app.use(async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log("Yetkilendirme başlığı bulunamadı");
      throw new Error("Authorization header required");
    }

    const token = authHeader.split(" ")[1];
    console.log("Token doğrulanıyor...");
    req.user = await admin.auth().verifyIdToken(token);
    console.log("Token başarıyla doğrulandı");
    next();
  } catch (err) {
    console.error("Kimlik doğrulama hatası:", err.message);
    res.status(401).json({ error: err.message });
  }
});

// Routes
app.use("/api", routes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
