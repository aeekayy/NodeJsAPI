'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Addresss', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
	defaultValue: Sequelize.UUIDV4
      },
      address_1: { type: Sequelize.STRING(128) },
      address_2: { type: Sequelize.STRING(128) },
      city: { type: Sequelize.STRING(64) },
      state: { type: Sequelize.STRING(3) },
      zip: { type: Sequelize.STRING(10) },
      coordinate: { type: Sequelize.GEOMETRY('POINT') },
      map_data: { type: Sequelize.JSON },
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
    return queryInterface.dropTable('Addresss');
  }
};
