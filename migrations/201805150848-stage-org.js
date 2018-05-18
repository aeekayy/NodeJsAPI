'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('OrganizationStages', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
	defaultValue: Sequelize.UUIDV4
      },
      owner_id: { type: Sequelize.UUID },
      stage_id: { type: Sequelize.UUID }, 
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
    return queryInterface.dropTable('Images');
  }
};
