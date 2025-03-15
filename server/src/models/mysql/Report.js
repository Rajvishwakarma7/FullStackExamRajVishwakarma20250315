const { mysqlPool } = require("../../config/db");

const Report = {
  async getDailyRevenue() {
    const [rows] = await mysqlPool.execute(`
      SELECT DATE(created_at) AS date, SUM(total) AS revenue 
      FROM orders 
      WHERE created_at >= NOW() - INTERVAL 7 DAY 
      GROUP BY DATE(created_at) 
      ORDER BY DATE(created_at) DESC
    `);
    return rows;
  },

  async getTopSpenders() {
    const [rows] = await mysqlPool.execute(`
      SELECT u.id, u.name, SUM(o.total) AS total_spent 
      FROM users u 
      JOIN orders o ON u.id = o.user_id 
      GROUP BY u.id 
      ORDER BY total_spent DESC 
      LIMIT 3
    `);
    return rows;
  },
};

module.exports = Report;
