'use strict';
var Promise = require("bluebird");
const apiconfig = require('../config/apiconfig');
const node_geocoder = require("node-geocoder");

module.exports = function(sequelize, DataTypes) {
  var Session = sequelize.define('Session', {
    id: {
       type: DataTypes.UUID, 
       primaryKey: true,
       defaultValue: DataTypes.UUIDV4
    },
    username: { 
	type: DataTypes.STRING(128), 
	unique: true, 
	allowNull: false
    },
    expiration: { 
	type: DataTypes.DATE,
	allowNull: false,
	defaultValue: sequelize.literal('CURRENT_TIMESTAMP + interval \'6 hours\'')
    }
  }, {
    classMethods: {
      associate: function(models) {
      }
    },
    hooks: {
    },
    instanceMethods: {

    }
  });

  return Session;
};
