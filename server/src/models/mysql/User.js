const { mysqlPool } = require("../../config/db");

const User = {
  async createUser(name, email, passwordHash) {
    const [result] = await mysqlPool.execute(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, passwordHash]
    );
    return result.insertId;
  },

  async findByEmail(email) {
    const [rows] = await mysqlPool.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    return rows.length > 0 ? rows[0] : null;
  },
};

module.exports = User;
