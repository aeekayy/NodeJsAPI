'use strict';
module.exports = function(sequelize, DataTypes) {
  var StageSpace = sequelize.define('StageSpace', {
    stage_name: { type: DataTypes.STRING(128) }, 
    addresses: { type: DataTypes.INTEGER, references: { model: Address, key: 'id' }  }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  var Address = sequelize.define('Address', {
    stage_address_1: { type: DataTypes.STRING(128) },
    stage_address_2: { type: DataTypes.STRING(128) },
    stage_city: { type: DataTypes.STRING(64) },
    stage_state: { type: DataTypes.STRING(3) },
    stage_zip: { type: DataTypes.STRING(10) }
  });

  StageSpace.Addresses = StageSpace.hasMany(Address); 

  StageSpace.sync({
	force: true
  });

  return StageSpace;
};
