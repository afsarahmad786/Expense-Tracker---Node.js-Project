const path = require("path");

const express = require("express");
const userAuthenticate = require("../middleware/auth");

const expensecontroller = require("../controllers/expense");

const router = express.Router();

router.post("/expense", userAuthenticate.authenticate, expensecontroller.add);
router.get("/expense", userAuthenticate.authenticate, expensecontroller.list);

module.exports = router;
