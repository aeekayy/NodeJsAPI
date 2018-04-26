'use strict';

module.exports = function(sequelize, DataTypes) {
  var Image = sequelize.define('Image', {
    id: {
       type: DataTypes.UUID, 
       primaryKey: true,
       defaultValue: DataTypes.UUIDV4
    },
    owner_id: { type: DataTypes.UUID }, 
    description: { type: DataTypes.TEXT }, 
    image_url: { type: DataTypes.STRING },
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

  return Image;
};
