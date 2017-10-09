'use strict';
module.exports = function(sequelize, DataTypes) {
  var StageAddress = sequelize.define('StageAddress', {
    stage_address_1: { type: DataTypes.STRING(128) },
    stage_address_2: { type: DataTypes.STRING(128) },
    stage_city: { type: DataTypes.STRING(64) },
    stage_state: { type: DataTypes.STRING(3) },
    stage_zip: { type: DataTypes.STRING(10) }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        //  
        StageAddress.belongsTo(models.StageSpace, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
     }
   }
  });

  StageAddress.sync({
        force: true
  });

  return StageAddress;
};
