'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn(
	{
		tableName: 'Users', 
		schema: 'public'
	},
	'organization_id', 
	{
	type: Sequelize.UUID, 
	references: { 
		model: 'Organizations',
		key: 'id'
	}, 
	onUpdate: 'cascade', 
	onDelete: 'restrict'
    	}
     )
};
