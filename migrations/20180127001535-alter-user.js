'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return [ 
	queryInterface.addColumn('Users', 'organization', { type: Sequelize.UUID, references: { model: 'Organizations', key: 'id' }, onUpdate: 'cascade', onDelete: 'no action'})
    ]
  },
  down: function(queryInterface, Sequelize) {
	return [
		queryInterface.removeColumn('Users', 'organization')
	]
  }
}; 
