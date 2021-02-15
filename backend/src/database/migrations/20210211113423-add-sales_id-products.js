"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("products", "sale_id", {
      type: Sequelize.INTEGER,
      references: { model: "sales", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("products", "sale_id");
  },
};
