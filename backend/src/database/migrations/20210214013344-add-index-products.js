'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addIndex('sales', ['month'])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('sales', 'month');
  }
};
