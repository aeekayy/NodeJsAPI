'use strict';

module.exports = function(sequelize, DataTypes) {
  var StageSpace = sequelize.define('StageSpace', {
    id: {
       type: DataTypes.UUID, 
       primaryKey: true,
       defaultValue: DataTypes.UUIDV4
    },
    stage_name: { type: DataTypes.STRING(128) },
    stage_address: { type: DataTypes.UUID },
    stage_description: { type: DataTypes.TEXT },
    stage_rate_per_hour: { type: DataTypes.FLOAT }, 
    stage_fix_rate: { type: DataTypes.FLOAT }, 
    stage_hours: { type: DataTypes.INTEGER }, 
  }, {
    classMethods: {
      associate: function(models) {
	StageSpace.hasOne( models.Address, { as: 'stage_address' });
      }
    },
    hooks: {
    },
    instanceMethods: {

    }
  });

  return StageSpace;
};
