'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('StageSpaces', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
	defaultValue: Sequelize.UUIDV4
      },
      stage_name: {
        type: Sequelize.STRING,
	allowNull: false
      },
      stage_name: { type: Sequelize.STRING(128) },
      stage_address_1: { type: Sequelize.STRING(128) },
      stage_address_2: { type: Sequelize.STRING(128) },
      stage_city: { type: Sequelize.STRING(64) },
      stage_state: { type: Sequelize.STRING(3) },
      stage_zip: { type: Sequelize.STRING(10) },
      stage_coordinate: { type: Sequelize.GEOMETRY('POINT') },
      stage_description: { type: Sequelize.TEXT },
      stage_rate_per_hour: { type: Sequelize.FLOAT }, 
      stage_fix_rate: { type: Sequelize.FLOAT },
      stage_hours: { type: Sequelize.INTEGER },
      stage_map_data: { type: Sequelize.JSON },
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
    return queryInterface.dropTable('StageSpaces');
  }
};
