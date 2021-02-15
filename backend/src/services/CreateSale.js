const { Sale, Product, User } = require("../models/index");
const AppError = require('../Errors/AppError')
module.exports = async ({ sale_date, products, id }) => {
  const user = await User.findOne({where: { id } })
  if (!user)
    throw new AppError(404, 'User notfound')
  const sales = await Sale.findAll({
    where: {
      month: new Date(sale_date).getMonth(),
    },
  });
  const bonus = user.year <= 5 ? 0.03 : user.year > 10 ? 0.1 : 0.6;
  const sale = await Sale.create(
    {
      products,
      sale_date: new Date(sale_date),
      month: new Date(sale_date).getMonth(),
      total: products.reduce((acc, curr) => acc + curr.value, 0),
      total_commission: products.reduce(
        (acc, curr) =>
          (acc +
          (curr.value * (curr.service ? 0.25 : 0.1)) +
          (sales.leght > 4 ? curr.value * bonus : 0)),
        0
      ),
      user_id: id,
    },
    { include: [{ model: Product, as: "products" }] }
  );
  return { sale };
};