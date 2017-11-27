'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Organizations', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
	defaultValue: Sequelize.UUIDV4
      },
      organization_name: {
        type: Sequelize.STRING,
	allowNull: false
      },
      organization_name: { type: Sequelize.STRING(128) },
      organization_address_1: { type: Sequelize.STRING(128) },
      organization_address_2: { type: Sequelize.STRING(128) },
      organization_city: { type: Sequelize.STRING(64) },
      organization_state: { type: Sequelize.STRING(3) },
      organization_zip: { type: Sequelize.STRING(10) },
      organization_email: { type: Sequelize.STRING(128), unique: true, isEmail: true },
      organization_coordinate: { type: Sequelize.GEOMETRY('POINT') },
      organization_description: { type: Sequelize.TEXT },
      organization_type: { type: Sequelize.ENUM('production', 'stage' ) }, 
      organization_rate_per_hour: { type: Sequelize.FLOAT }, 
      organization_fix_rate: { type: Sequelize.FLOAT },
      organization_hours: { type: Sequelize.INTEGER },
      organization_map_data: { type: Sequelize.JSON },
      stripe_id: { type: Sequelize.STRING(64) }, 
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
    return queryInterface.dropTable('Organizations');
  }
};
