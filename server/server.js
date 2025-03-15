const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectMongoDB, checkMySQLConnection } = require("./src/config/db");

const authRoutes = require("./src/routes/authRoutes");
const productRoutes = require("./src/routes/productRoutes");
const cartRoutes = require("./src/routes/cartRoutes");
const orderRoutes = require("./src/routes/orderRoutes");
// const reportRoutes = require("./src/routes/reportRoutes");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
// app.use("/api/reports", reportRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectMongoDB();
    await checkMySQLConnection();

    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(
      " Server failed to start due to DB connection issues:",
      error
    );
    process.exit(1);
  }
};

startServer();
