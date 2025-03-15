const express = require("express");
const OrderController = require("../controllers/OrderController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/place", authMiddleware, OrderController.placeOrder);
router.get("/", authMiddleware, OrderController.getOrders);

module.exports = router;
