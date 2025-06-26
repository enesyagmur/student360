const express = require("express");
const router = express.Router();
const managersRouter = require("./api/managers.routes");

// Mount routes
router.use("/managers", managersRouter);

// Public routes
router.get("/public", (req, res) => {
  res.json({ message: "Public route" });
});

module.exports = router;
