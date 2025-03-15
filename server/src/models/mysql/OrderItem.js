const { mysqlPool } = require("../../config/db");

const OrderItem = {
  async addItem(orderId, productId, quantity, price) {
    await mysqlPool.execute(
      "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
      [orderId, productId, quantity, price]
    );
  },
};

module.exports = OrderItem;
