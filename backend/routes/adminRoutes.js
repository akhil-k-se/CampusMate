const express = require("express");
const router = express.Router();
const adminController = require("../Controllers/adminController");
// const userValidation = require("../middlewares/userValidate");
// const userLogin = require("../middlewares/userLogin");

router.post("/signup", adminController.register);
router.post("/login", adminController.login);
// update info of user
router.post("/update-user/:_id", adminController.updateUser);

module.exports = router;