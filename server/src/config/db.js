const mysql = require("mysql2/promise");
const mongoose = require("mongoose");
require("dotenv").config();

const mysqlUrl = new URL(process.env.MYSQL_PUBLIC_URL);

const mysqlPool = mysql.createPool({
  host: mysqlUrl.hostname,
  user: mysqlUrl.username,
  password: mysqlUrl.password,
  database: mysqlUrl.pathname.replace("/", ""),
  port: mysqlUrl.port,
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
