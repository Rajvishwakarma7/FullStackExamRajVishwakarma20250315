const Product = require("./Product");
const OrderItem = require("../../models/sql/OrderItem");

const Report = {
  async getSalesByCategory() {
    const sales = await OrderItem.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "product_id",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $group: {
          _id: "$productDetails.category",
          totalSales: { $sum: "$quantity" },
        },
      },
      { $sort: { totalSales: -1 } },
    ]);
    return sales;
  },
};

module.exports = Report;
