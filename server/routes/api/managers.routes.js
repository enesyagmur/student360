const express = require("express");
const router = express.Router();

const {
  createManager,
  getUsersByRole,
  deleteManager,
} = require("../../controllers/user.controller");

const {
  requirePrincipal,
  requireRoleBasedAccess,
} = require("../../middlewares/auth.middleware");

//sadece müdür yapabilir
router.post("/", requirePrincipal, createManager);

//tüm yöneticiler görebilir
router.get("/by-role/:role", requireRoleBasedAccess, getUsersByRole);

//sadece müdür silebilir
router.delete("/:managerId", requirePrincipal, deleteManager);

module.exports = router;
