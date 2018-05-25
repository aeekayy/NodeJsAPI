'use strict';
var Promise = require("bluebird");
const apiconfig = require('../config/apiconfig');

module.exports = function(sequelize, DataTypes) {
  var Booking = sequelize.define('Booking', {
    id: {
       type: DataTypes.UUID, 
       primaryKey: true,
       defaultValue: DataTypes.UUIDV4
    },
    reserver: { type: DataTypes.UUID }, // the person or entity
	// who is reserving the stage 
    stage_id: { type: DataTypes.UUID }, // the stage that the 
	// reservation is tied to 
    during: { type: DataTypes.RANGE(DataTypes.DATE) }, 
    request: { type: DataTypes.TEXT },
    status: { type: DataTypes.ENUM( 'reserved', 'pending', 'canceled' ), defaultValue: 'pending' },
  }, {
    classMethods: {
      associate: function(models) {
      }
    },
    hooks: {
	afterCreate: (booking, options, cb) => {
		return new Promise(function (resolve, reject) {
				resolve(booking);
		});
	}
    },
    instanceMethods: {

    }
  });

  return Booking;
};
