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
    organization_address_1: { type: DataTypes.STRING(128) },
    organization_address_2: { type: DataTypes.STRING(128) },
    organization_city: { type: DataTypes.STRING(64) },
    organization_state: { type: DataTypes.STRING(3) },
    organization_zip: { type: DataTypes.STRING(10) },
    organization_coordinate: { type: DataTypes.GEOMETRY('POINT') },
    organization_description: { type: DataTypes.TEXT },
    organization_map_data: { type: DataTypes.JSON }
  }, {
    classMethods: {
      associate: function(models) {
	Organization.hasMany( models.User, { as: 'users' } );
      }
    },
    hooks: {
	beforeCreate: (organization, options, cb) => {
		return new Promise(function (resolve, reject) {
			if(!(organization.getDataValue('organization_city') && organization.getDataValue('organization_state'))) {
				return sequelize.Promise.reject('No city or state provided.');
			}

			var geocoder = node_geocoder(apiconfig.node_geocoder_options);
			geocoder.geocode(organization.getDataValue('organization_address_1') + ", " + ", " + organization.getDataValue('organization_city') + ", " + organization.getDataValue('organization_state') + " " + organization.getDataValue('organization_zip'))
			.then(geocoding => {
				var point = { type: 'Point', coordinates: [ geocoding[0].latitude, geocoding[0].longitude ] };
				organization.setDataValue('organization_coordinate', point);
				organization.setDataValue('organization_map_data', geocoding[0]);
				resolve(organization);
			});
			
		});
	}
    },
    instanceMethods: {

    }
  });

  return Organization;
};
