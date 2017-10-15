'use strict';
var Promise = require("bluebird");
const apiconfig = require('../config/apiconfig');
const node_geocoder = require("node-geocoder");

module.exports = function(sequelize, DataTypes) {
  var StageSpace = sequelize.define('StageSpace', {
    id: {
       type: DataTypes.UUID, 
       primaryKey: true,
       defaultValue: DataTypes.UUIDV4
    },
    stage_name: { type: DataTypes.STRING(128) },
    stage_address_1: { type: DataTypes.STRING(128) },
    stage_address_2: { type: DataTypes.STRING(128) },
    stage_city: { type: DataTypes.STRING(64) },
    stage_state: { type: DataTypes.STRING(3) },
    stage_zip: { type: DataTypes.STRING(10) },
    stage_coordinate: { type: DataTypes.GEOMETRY('POINT') },
    stage_map_data: { type: DataTypes.JSON }
  }, {
    classMethods: {
      associate: function(models) {
      },

      addFullTextIndex: function() {
      }
    },
    hooks: {
	beforeCreate: (stagespace, options, cb) => {
		return new Promise(function (resolve, reject) {
			if(!(stagespace.getDataValue('stage_city') && stagespace.getDataValue('stage_state'))) {
				return sequelize.Promise.reject('No city or state provided.');
			}

			var geocoder = node_geocoder(apiconfig.node_geocoder_options);
			geocoder.geocode(stagespace.getDataValue('stage_address_1') + ", " + ", " + stagespace.getDataValue('stage_city') + ", " + stagespace.getDataValue('stage_state') + " " + stagespace.getDataValue('stage_zip'))
			.then(geocoding => {
				var point = { type: 'Point', coordinates: [ geocoding[0].latitude, geocoding[0].longitude ] };
				stagespace.setDataValue('stage_coordinate', point);
				stagespace.setDataValue('stage_map_data', geocoding[0]);
				resolve(stagespace);
			});
			
		});
	}
    },
    instanceMethods: {

    }
  });

  StageSpace.sync({
	force: true
  });

  return StageSpace;
};
