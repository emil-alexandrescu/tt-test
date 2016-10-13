'use strict';
var md5 = require('md5');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      INSERT INTO users (name, email, password, role) VALUES ("Super admin", "admin@admin.com", "${md5('test')}", "ADMIN")
    `);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query('DELETE FROM users WHERE email="admin@admin.com"');
  }
};
