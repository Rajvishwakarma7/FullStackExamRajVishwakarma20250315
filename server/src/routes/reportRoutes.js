const express = require("express");
const ReportController = require("../controllers/ReportController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, ReportController.getReports);

module.exports = router;
