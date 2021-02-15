module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      name: DataTypes.STRING,
      value: DataTypes.STRING,
      service: DataTypes.BOOLEAN,
      sale_id: DataTypes.INTEGER,
    }
  );
  return Product;
};