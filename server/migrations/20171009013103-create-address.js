'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
	return queryInterface.createTable('Addresses', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true, 
			type: Sequelize.INTEGER
		},
		stage_address_1: {
			type: Sequelize.STRING(128)
		},
		stage_address_2: {
			type: Sequelize.STRING(128)
		},
		stage_city: {
			type: Sequelize.STRING(64)
		},
		stage_state: {
			type: Sequelize.STRING(3)
		},
		stage_zip: {
			type: Sequelize.STRING(10)
		},
		createAt: {
			allowNull: false,
			type: Sequelize.DATE
		},
		updatedAt: {
			allowNull: false,
			type: Sequelize.DATE
		}
	});
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.dropTable('Addresses');
  }
};
