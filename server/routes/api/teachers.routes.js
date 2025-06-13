const express = require("express");
const router = express.Router();

const {
  createTeacher,
  getUsersByRole,
  deleteTeacher,
} = require("../../controllers/user.controller");

const { requireRoleBasedAccess } = require("../../middlewares/auth.middleware");

// Tüm yöneticiler öğretmen ekleyebilir
router.post("/", requireRoleBasedAccess, createTeacher);

// Tüm yöneticiler görebilir
router.get("/by-role/:role", requireRoleBasedAccess, getUsersByRole);

// Öğretmen silme
router.delete("/:id", requireRoleBasedAccess, deleteTeacher);

module.exports = router;
