const mongoose = require("mongoose");
const Cart = require("../models/mongo/Cart");
const Product = require("../models/mongo/Product");

const CartController = {
  async getCart(req, res) {
    try {
      const userId = req.user.userId.toString();
      const cart = await Cart.find({ userId: userId }).populate(
        "items.productId"
      );
      if (!cart) return res.status(404).json({ message: "Cart is empty" });
      console.log("cart--------->>>", cart);

      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  async addToCart(req, res) {
    try {
      const userId = req.user.userId.toString();
      const { productId, quantity } = req.body;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      let cart = await Cart.findOne({ userId: userId });
      if (!cart) {
        cart = new Cart({
          userId: userId,
          items: [{ productId, quantity }],
        });
      } else {
        const itemIndex = cart.items.findIndex(
          (item) => item.productId.toString() === productId
        );
        if (itemIndex > -1) {
          cart.items[itemIndex].quantity += quantity;
        } else {
          cart.items.push({ productId, quantity });
        }
      }

      await cart.save();
      res.json({ message: "Item added to cart", cart });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  async removeFromCart(req, res) {
    try {
      const userId = req.user.userId.toString();
      const { productId } = req.body;
      let cart = await Cart.findOne({ userId: userId });
      if (!cart) return res.status(404).json({ message: "Cart is empty" });

      cart.items = cart.items.filter(
        (item) => item.productId.toString() !== productId
      );
      await cart.save();
      res.json({ message: "Item removed from cart", cart });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  async clearCart(req, res) {
    try {
      const userId = req.user.userId.toString();
      await Cart.findOneAndDelete({ userId: userId });
      res.json({ message: "Cart cleared" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
};

module.exports = CartController;
