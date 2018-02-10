'use strict';
module.exports = function(sequelize, DataTypes) {
  var Company = sequelize.define('Company', {
    company_name: DataTypes.STRING,
    description: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    email_verified: DataTypes.DATE,
    active: DataTypes.BOOLEAN,
    deleted: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Company;
};