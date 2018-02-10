'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return [ 
	queryInterface.addColumn('Organizations', 'stripe_id', { type: Sequelize.STRING(64) })
    ]
  },
  down: function(queryInterface, Sequelize) {
	return [
		queryInterface.removeColumn('Organizations', 'strip_id')
	]
  }
}; 
