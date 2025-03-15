const { mysqlPool } = require("../config/db");
const Cart = require("../models/mongo/Cart");
const Product = require("../models/mongo/Product");
const Order = require("../models/mysql/Order");
const OrderItem = require("../models/mysql/OrderItem");

const OrderController = {
  async placeOrder(req, res) {
    try {
      console.log("res userid ", req.user);
      if (!req.user || !req.user.userId) {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      const userId = Number(req.user.userId);

      const [user] = await mysqlPool.execute(
        "SELECT id FROM users WHERE id = ?",
        [userId]
      );
      if (user.length === 0) {
        return res.status(400).json({ message: "User does not exist" });
      }

      const cart = await Cart.findOne({ userId: userId.toString() }).populate(
        "items.productId"
      );
      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
      }

      let totalAmount = 0;
      cart.items.forEach((item) => {
        totalAmount += item.productId.price * item.quantity;
      });

      const orderId = await Order.createOrder(userId, totalAmount);

      for (const item of cart.items) {
        await OrderItem.addItem(
          orderId,
          item.productId._id,
          item.quantity,
          item.productId.price
        );
      }

      await Cart.findOneAndDelete({ userId: userId.toString() });

      res.json({ message: "Order placed successfully", orderId });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  async getOrders(req, res) {
    try {
      const orders = await Order.getOrdersByUser(req.user.userId);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
};

module.exports = OrderController;
