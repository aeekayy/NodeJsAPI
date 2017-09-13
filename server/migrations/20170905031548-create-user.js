'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
	allowNull: false,
	isEmail: true
      },
      phone_number: {
        type: Sequelize.STRING
      },
      password_hash: {
        type: Sequelize.STRING
      },
      password_salt: {
        type: Sequelize.STRING
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      user_type: {
        type: Sequelize.INTEGER,
	references: {
		model: 'UserTypes',
		key: 'id',
	}
      },
      two_factor_enabled: {
        type: Sequelize.BOOLEAN,
	defaultValue: false
      },
      email_verified: {
        type: Sequelize.DATE
      },
      active: {
        type: Sequelize.BOOLEAN
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
  down: (queryInterface /*, Sequelize */) => queryInterface.dropTable('Users')
};
