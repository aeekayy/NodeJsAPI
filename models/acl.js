'use strict';

module.exports = function(sequelize, DataTypes) {
  var Acl = sequelize.define('Acl', {
    id: {
       type: DataTypes.UUID, 
       primaryKey: true,
       defaultValue: DataTypes.UUIDV4
    },
    acl: { type: DataTypes.STRING(64) }, 
    description: { type: DataTypes.TEXT }
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

  return Acl;
};
