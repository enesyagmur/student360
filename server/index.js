const express = require("express");
const cors = require("cors");
const admin = require("./config/firebase-admin");
const routes = require("./routes");
require("dotenv").config();
const { authenticateToken } = require("./middlewares/auth.middleware");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Public routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Protected routes
app.use("/api", authenticateToken, routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Available routes:");
  console.log("GET /api/health");
});
