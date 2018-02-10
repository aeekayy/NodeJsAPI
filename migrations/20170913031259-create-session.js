'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Sessions', {
      id: {
        allowNull: false,
        primaryKey: true,
	defaultValue: Sequelize.UUIDV4,
        type: Sequelize.UUID
      },
      username: {
        type: Sequelize.STRING,
	allowNull: false
      },
      source_ip: {
        type: Sequelize.STRING,
	isIP: true
      },
      active: {
        type: Sequelize.DATE,
        allowNull: false,
	defaultValue: Sequelize.literal('now() + interval \'3 hours\'')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Sessions');
  }
};
