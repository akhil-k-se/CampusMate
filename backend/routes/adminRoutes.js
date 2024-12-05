const express = require("express");
const router = express.Router();
const adminController = require("../Controllers/adminController");
const upload = require("../middlewares/multer");
// const userValidation = require("../middlewares/userValidate");
// const userLogin = require("../middlewares/userLogin");

router.post("/signup",upload.single('image'), adminController.register);
router.post("/login", adminController.login);
router.get('/showData', adminController.showData)
router.post('/update-menu',upload.single('image'),adminController.updateMenu);
router.get('/showMenu',adminController.showMenu);


router.post("/update-user/:_id", adminController.updateUser);
router.delete("/delete/:id", adminController.deleteUser)

module.exports = router;