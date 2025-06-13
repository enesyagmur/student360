const express = require("express");
const router = express.Router();
const {
  createManager,
  getUsersByRole,
} = require("../../controllers/user.controller");
const {
  requirePrincipal,
  requireRoleBasedAccess,
} = require("../../middlewares/auth.middleware");

//sadece müdür yapabilir
router.post("/", requirePrincipal, createManager);

//tüm yöneticiler görebilir
router.get("/by-role/:role", requireRoleBasedAccess, getUsersByRole);

module.exports = router;
