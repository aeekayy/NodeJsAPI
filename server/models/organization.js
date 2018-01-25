'use strict';
var Promise = require("bluebird");
const apiconfig = require('../config/apiconfig');
const node_geocoder = require("node-geocoder");

module.exports = function(sequelize, DataTypes) {
  var Organization = sequelize.define('Organization', {
    id: {
       type: DataTypes.UUID, 
       primaryKey: true,
       defaultValue: DataTypes.UUIDV4
    },
    organization_name: { type: DataTypes.STRING(128) },
    organization_address: { type: DataTypes.UUID },
    organization_email: { type: DataTypes.STRING(128), unique: true, isEmail: true },
    organization_description: { type: DataTypes.TEXT },
    stripe_id: { type: DataTypes.STRING(64) }
  }, {
    classMethods: {
      associate: function(models) {
	Organization.hasMany( models.User, { as: 'users' } );
	Organization.hasOne( models.Address, { as: 'organization_address' });
      }
    },
    hooks: {
	afterCreate: (organization, options, cb) => {
		return new Promise(function (resolve, reject) {
			stripe.customers.create({
				email: organization.organization_email
			})
			.then(customer => {
				return organization.setDataValue('stripe_id', customer.id);
				resolve(organization);
			})
		});
	}
    },
    instanceMethods: {

    }
  });

  return Organization;
};
