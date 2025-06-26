const express = require("express");
const router = express.Router();

const { deleteTeacher } = require("../../controllers/user.controller");

const { requirePrincipal } = require("../../middlewares/auth.middleware");

// Öğretmen silme
router.delete("/:id", requirePrincipal, deleteTeacher);

module.exports = router;
