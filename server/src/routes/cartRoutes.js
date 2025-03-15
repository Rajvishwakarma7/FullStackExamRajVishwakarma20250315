const express = require("express");
const CartController = require("../controllers/CartController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, CartController.getCart);
router.post("/add", authMiddleware, CartController.addToCart);
router.post("/remove", authMiddleware, CartController.removeFromCart);
router.delete("/clear", authMiddleware, CartController.clearCart);

module.exports = router;
