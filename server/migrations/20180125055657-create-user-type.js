'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('UserTypes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
	defaultValue: Sequelize.UUIDV4
      },
      typename: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      active: {
        type: Sequelize.BOOLEAN,
	defaultValue: true 
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  down: (queryInterface /*, Sequelize */) => queryInterface.dropTable('UserTypes')
};
