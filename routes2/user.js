const path = require("path");

const express = require("express");

const usercontroller = require("../controllers/user");

const router = express.Router();

router.post("/register", usercontroller.register);
router.post("/login", usercontroller.login);
router.post("/password/forgotpassword", usercontroller.restorepass);

module.exports = router;
