'use strict';
module.exports = function(sequelize, DataTypes) {
  var Session = sequelize.define('Session', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    username: {
	type: DataTypes.STRING,
	allowNull: false,
    },
    source_ip: {
        type: DataTypes.STRING(15),
	isIP: true
    },
    active: { 
	type: DataTypes.DATE,
	defaultValue: DataTypes.NOW
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Session;
};
