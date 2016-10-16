'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable(
      'expenses',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        userId: Sequelize.INTEGER,
        amount: Sequelize.FLOAT,
        description: Sequelize.STRING(255),
        comment: Sequelize.STRING(255),
        dateTime: Sequelize.DATE
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('expenses');
  }
};
