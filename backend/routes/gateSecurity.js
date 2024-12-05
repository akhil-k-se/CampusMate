const express = require("express");
const router = express.Router();
const gateSecurityController = require("../Controllers/gateSecurityController");

router.post("/signup", gateSecurityController.register);
router.post("/login", gateSecurityController.login);
router.delete("/delete/:id", gateSecurityController.deleteUser)
module.exports = router;