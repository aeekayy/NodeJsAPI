'use strict';

module.exports = function(sequelize, DataTypes) {
  var OrganizationStage = sequelize.define('OrganizationStage', {
    id: {
       type: DataTypes.UUID, 
       primaryKey: true,
       defaultValue: DataTypes.UUIDV4
    },
    OwnerId: { type: DataTypes.UUID }, 
    StageId: { type: DataTypes.UUID }, 
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

  return OrganizationStage;
};
