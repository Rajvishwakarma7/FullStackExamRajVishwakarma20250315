const ReportSQL = require("../models/mysql/Report");
const ReportMongo = require("../models/mongo/Report");

const ReportController = {
  async getReports(req, res) {
    try {
      const [dailyRevenue, topSpenders, salesByCategory] = await Promise.all([
        ReportSQL.getDailyRevenue(),
        ReportSQL.getTopSpenders(),
        ReportMongo.getSalesByCategory(),
      ]);

      res.json({
        dailyRevenue,
        topSpenders,
        salesByCategory,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
};

module.exports = ReportController;
