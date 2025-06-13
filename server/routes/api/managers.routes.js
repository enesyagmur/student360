const express = require("express");
const router = express.Router();
const { createManager } = require("../../controllers/user.controller");
const { requirePrincipal } = require("../../middlewares/auth.middleware");

router.post("/", requirePrincipal, createManager);

module.exports = router;
