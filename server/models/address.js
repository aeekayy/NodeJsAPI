'use strict';
var Promise = require("bluebird");
const apiconfig = require('../config/apiconfig');
const node_geocoder = require("node-geocoder");

module.exports = function(sequelize, DataTypes) {
  var Address = sequelize.define('Address', {
    address_1: { type: DataTypes.STRING(128) },
    address_2: { type: DataTypes.STRING(128) },
    city: { type: DataTypes.STRING(64) },
    state: { type: DataTypes.STRING(3) },
    zip: { type: DataTypes.STRING(10) },
    coordinate: { type: DataTypes.GEOMETRY('POINT') }, 
    map_data: { type: DataTypes.JSON }
  }, {
    classMethods: {
      associate: function(models) {
     }
   },
   hooks: {
     beforeCreate: (address, options, cb) => {
       return new Promise(function (resolve, reject) {
       if(!(address.getDataValue('city') && address.getDataValue('state'))) {
	return sequelize.Promise.reject('No city or state provided.'); 
       }

	var geocoder = node_geocoder(apiconfig.node_geocodr_options);
	var address_two; 
	if (address.getDataValue('address_2') == null || address.getDataValue('address_2').trim() == '') {
		address_two = ""; 
	} else {
		address_two = address.getDataValue('address_2'); 
	}

	// get the coordinates of the address entered 
	geocoder.geocode(address.getDataValue('address_1') + ", " + address_two + ", " + address.getDataValue('city') + ", " + address.getDataValue('state') + " " + address.getDataValue('zip'))
	.then(geocoding => {
		var point = { type: 'Point', coordinates: [ geocoding[0].latitude, geocoding[0].longitude ] };
		address.setDataValue('coordinate', point); 
		address.setDataValue('map_data', geocoding[0]); 
		resolve(address);
		}); 
	});
     }
   }, 
   instanceMethods: {

   }
  });

  return Address;
};
