'use strict';
var Promise = require("bluebird");
const apiconfig = require('../config/apiconfig');
const node_geocoder = require("node-geocoder");
const stringifyObject = require("stringify-object");

module.exports = function(sequelize, DataTypes) {
  var Address = sequelize.define('Address', {
    id: {
       type: DataTypes.UUID,
       primaryKey: true,
       defaultValue: DataTypes.UUIDV4
    },
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
       if(!(address.getDataValue('city') && address.getDataValue('state')) && !address.getDataValue('zip')) {
	reject({ "errors": "'No city, state or zip code provided." }); 
       }

	var geocoder = node_geocoder(apiconfig.node_geocoder_options);
	var address_two; 
	if (address.getDataValue('address_2') == null || address.getDataValue('address_2').trim() == '') {
		address_two = ""; 
	} else {
		address_two = ", " + address.getDataValue('address_2'); 
	}

	var street = (address.getDataValue('address_1') ? address.getDataValue('address_1') + address_two + ", " : "");
	var city_state = (address.getDataValue('city') ? address.getDataValue('city') + ", " + address.getDataValue('state') : "");

	// get the coordinates of the address entered 
	geocoder.geocode({ 'address': street + city_state + " " + address.getDataValue('zip') })
	.then(geocoding => {
		var point = { type: 'Point', coordinates: [ geocoding[0].latitude, geocoding[0].longitude ] };
		address.setDataValue('city', geocoding[0].city);
		address.setDataValue('state', geocoding[0].administrativeLevels.level1short);
		address.setDataValue('coordinate', point); 
		address.setDataValue('map_data', geocoding[0]); 
		resolve(address);
		}); 
	})
	.catch( error => reject({ "errors": error }));
     },
     beforeUpdate: (address, options, cb) => {
	return new Promise(function (resolve, reject) {
       if(!(address.getDataValue('city') && address.getDataValue('state')) && !address.getDataValue('zip')) {
        reject({ "errors": "'No city, state or zip code provided." });
       }

        var geocoder = node_geocoder(apiconfig.node_geocoder_options);
        var address_two;
        if (address.getDataValue('address_2') == null || address.getDataValue('address_2').trim() == '') {
                address_two = "";
        } else {
                address_two = ", " + address.getDataValue('address_2');
        }

        var street = (address.getDataValue('address_1') ? address.getDataValue('address_1') + address_two + ", " : "");
        var city_state = (address.getDataValue('city') ? address.getDataValue('city') + ", " + address.getDataValue('state') : "");

        // get the coordinates of the address entered
        geocoder.geocode({ 'address': street + city_state + " " + address.getDataValue('zip') })
        .then(geocoding => {
                var point = { type: 'Point', coordinates: [ geocoding[0].latitude, geocoding[0].longitude ] };
                address.setDataValue('city', geocoding[0].city);
                address.setDataValue('state', geocoding[0].administrativeLevels.level1short);
                address.setDataValue('coordinate', point);
                address.setDataValue('map_data', geocoding[0]);
                resolve(address);
                });
        })
        .catch( error => reject({ "errors": error }));
	}
   }, 
   instanceMethods: {

   }
  });

  return Address;
};
