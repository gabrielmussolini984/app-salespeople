const AppError = require('../Errors/AppError')
const { Sale, User, Product } = require("../models/index");
module.exports = async (id) => {
  const user = await User.findOne({ where: { id } });
  if (!user) throw new AppError(404, "User not found");
  const sales = await Sale.findAll({
    where: { user_id: id },
    include: { model: Product, as: 'products' },
  });

  return { sales };
};
