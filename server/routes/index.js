const express = require("express");
const router = express.Router();
const managersRouter = require("./api/managers.routes");

router.use("/managers", managersRouter);

module.exports = router;
