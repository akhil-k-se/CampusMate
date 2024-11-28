const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");

router.post("/signup", userController.register);
router.post("/login", userController.login);
router.get("/showdata", userController.showData)
router.get("/isBooked", userController.isBooked)
router.get("/stdGatePassList", userController.gatePassList)
router.get("/stdComplaintList", userController.complaintList)

router.post("/update-user/:_id", userController.updateUser);

module.exports = router;