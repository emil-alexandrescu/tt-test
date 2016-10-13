'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable(
      'users',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        email: Sequelize.STRING(255),
        name: Sequelize.STRING(255),
        password: Sequelize.STRING(255),
        role: Sequelize.STRING(10)
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('users');
  }
};
