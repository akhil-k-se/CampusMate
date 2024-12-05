const express = require("express");
const router = express.Router();
const superAdminController = require("../Controllers/superadminController")

router.post('/login', superAdminController.login)