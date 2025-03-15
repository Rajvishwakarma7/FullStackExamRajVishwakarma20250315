const mysql = require("mysql2/promise");
const mongoose = require("mongoose");
require("dotenv").config();

const mysqlPool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const checkMySQLConnection = async () => {
  try {
    const connection = await mysqlPool.getConnection();
    console.log("MySQL Connected");
    connection.release();
  } catch (error) {
    console.error("MySQL Connection Failed:", error);
    throw error;
  }
};

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    throw error;
  }
};

module.exports = { mysqlPool, checkMySQLConnection, connectMongoDB };
