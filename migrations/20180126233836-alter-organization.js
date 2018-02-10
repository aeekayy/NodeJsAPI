'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return [ 
	queryInterface.addColumn('Organizations', 'organization_email',  { type: Sequelize.STRING(128), unique: true, isEmail: true })
    ]
  },
  down: function(queryInterface, Sequelize) {
	return [
		queryInterface.removeColumn('Organizations', 'organization_email')
	]
  }
}; 
