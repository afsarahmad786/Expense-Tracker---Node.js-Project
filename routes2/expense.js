const path = require("path");

const express = require("express");

const expensecontroller = require("../controllers/expense");

const router = express.Router();

router.post("/expense", expensecontroller.add);
router.get("/expense", expensecontroller.list);

module.exports = router;
