'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
	defaultValue: Sequelize.UUIDV4
      },
	reserver: {
		type: Sequelize.UUID,
		allowNull: false
	},
	stage_id: {
		type: Sequelize.UUID,
		allowNull: false
	},
	during: {
		type: Sequelize.RANGE(Sequelize.DATE)
	},
	request: { type: Sequelize.TEXT },
	status: { type: Sequelize.ENUM('reserved', 'pending', 'canceled') },
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
    return queryInterface.dropTable('Bookings');
  }
};
