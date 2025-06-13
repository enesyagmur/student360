const express = require("express");
const router = express.Router();
const managersRouter = require("./api/managers.routes");
const teacherRoutes = require("./api/teachers.routes");

// Mount routes
router.use("/managers", managersRouter);
router.use("/teachers", teacherRoutes);

// Public routes
router.get("/public", (req, res) => {
  res.json({ message: "Public route" });
});

module.exports = router;
