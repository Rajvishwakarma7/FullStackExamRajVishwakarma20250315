const express = require("express");
const ProductController = require("../controllers/ProductController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, ProductController.createProduct);
router.get("/", ProductController.getProducts);
router.get("/:id", ProductController.getProductById);
router.put("/:id", authMiddleware, ProductController.updateProduct);
router.delete("/:id", authMiddleware, ProductController.deleteProduct);

module.exports = router;
