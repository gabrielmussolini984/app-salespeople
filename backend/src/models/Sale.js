module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define(
    "Sale",
    {
      total: DataTypes.FLOAT,
      total_commission: DataTypes.FLOAT,
      user_id: DataTypes.INTEGER,
      sale_date: DataTypes.DATE,
      month: DataTypes.INTEGER
    }
  );

  Sale.associate = models => {
    Sale.hasMany(models.Product, {as: 'products'});
    Sale.belongsTo(models.User);
  };
  return Sale;
};