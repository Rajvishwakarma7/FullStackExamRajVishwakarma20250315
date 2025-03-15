const mysql = require("mysql2/promise");
const mongoose = require("mongoose");
require("dotenv").config();

const mysqlPool = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
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
