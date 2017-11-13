'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Sessions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
	defaultValue: Sequelize.UUIDV4
      },
      username: {
        type: Sequelize.STRING(128),
	allowNull: false, 
	unique: true 
      },
      expiration: {
	type: Sequelize.DATE, 
	allowNull: false, 
	sequelize.literal('CURRENT_TIMESTAMP + interval \'6 hours\'')
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
