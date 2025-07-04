const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user.controller");

router.delete("/:managerId", userController.deleteManager);

module.exports = router;
