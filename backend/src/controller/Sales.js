const CreateSale = require("../services/CreateSale");
const ListSales = require("../services/ListSales");
module.exports = {
  async store(req, res) {
    try {
      const { products, sale_date } = req.body;
      if (!products)
        return res.status(400).json({ message: "Product is required" });
      if (!sale_date)
        return res.status(400).json({ message: "Sale date is required" });
      const resultado = await CreateSale({ sale_date, products, id: req.userId });
      res.json(resultado);
    } catch (error) {
      return res
        .status(error.status || 500)
        .json({ message: error.message || "Internal Server Error" });
    }
  },
  async index(req, res) {
    try {
      const sales = await ListSales(req.userId);
      res.json(sales);
    } catch (error) {
      return res
        .status(error.status || 500)
        .json({ message: error.message || "Internal Server Error" });
    }
  }
};
