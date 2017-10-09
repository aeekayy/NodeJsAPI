'use strict';
module.exports = function(sequelize, DataTypes) {
  var StageSpace = sequelize.define('StageSpace', {
    stage_name: { type: DataTypes.STRING(128) }, 
  }, {
    classMethods: {
      associate: function(models) {
        StageSpace.hasMany(models.StageAddress);
      }
    }
  });

  StageSpace.sync({
	force: true
  });

  return StageSpace;
};
