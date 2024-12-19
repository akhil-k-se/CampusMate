const express = require("express");
const router = express.Router();
const messController = require("../Controllers/messController");

router.post("/signup", messController.register);
router.post("/login",messController.login);
router.delete("/delete/:id", messController.deleteUser)
module.exports = router;