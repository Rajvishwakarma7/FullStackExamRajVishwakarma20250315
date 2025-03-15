const { mysqlPool } = require("../../config/db");

const Order = {
  async createOrder(userId, total) {
    const [result] = await mysqlPool.execute(
      "INSERT INTO orders (user_id, total) VALUES (?, ?)",
      [userId, total]
    );
    return result.insertId;
  },

  async getOrdersByUser(userId) {
    const [rows] = await mysqlPool.execute(
      "SELECT * FROM orders WHERE user_id = ?",
      [userId]
    );
    return rows;
  },
};

module.exports = Order;
