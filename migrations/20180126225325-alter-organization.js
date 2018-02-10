'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return [ 
	queryInterface.removeColumn('Organizations', 'organization_address_1'), 
	queryInterface.removeColumn('Organizations', 'organization_address_2'),
	queryInterface.removeColumn('Organizations', 'organization_city'),
	queryInterface.removeColumn('Organizations', 'organization_state'),
	queryInterface.removeColumn('Organizations', 'organization_zip'),
	queryInterface.removeColumn('Organizations', 'organization_coordinate'),
	queryInterface.removeColumn('Organizations', 'organization_map_data'),
	queryInterface.addColumn('Organizations', 'organization_address', { type: Sequelize.UUID, references: { model: 'Addresss', key: 'id' }, onUpdate: 'cascade', onDelete: 'no action'})
    ]
  },
  down: function(queryInterface, Sequelize) {
	return [
		queryInterface.addColumn('Organizations', 'organization_address_1', { type: Sequelize.STRING(128) }),
		queryInterface.addColumn('Organizations', 'organization_address_2', { type: Sequelize.STRING(128) }),
		queryInterface.addColumn('Organizations', 'organization_city', { type: Sequelize.STRING(64) }),
		queryInterface.addColumn('Organizations', 'organization_state', { type: Sequelize.STRING(3) }),
		queryInterface.addColumn('Organizations', 'organization_zip', { type: Sequelize.STRING(10) }),
		queryInterface.addColumn('Organizations', 'organization_coordinate', { type: Sequelize.GEOMETRY('POINT') }),
		queryInterface.addColumn('Organizations', 'organization_map_data', { type: Sequelize.JSON }),
		queryInterface.removeColumn('Organizations', 'organization_address')
	]
  }
}; 
