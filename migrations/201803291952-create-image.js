'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Images', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
	defaultValue: Sequelize.UUIDV4
      },
      owner_id: { type: Sequelize.UUID, allowNull: false },
      image_url: { type: Sequelize.STRING }, 
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
