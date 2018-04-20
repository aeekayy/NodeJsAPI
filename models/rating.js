'use strict';

module.exports = function(sequelize, DataTypes) {
  var Rating = sequelize.define('Rating', {
    id: {
       type: DataTypes.UUID, 
       primaryKey: true,
       defaultValue: DataTypes.UUIDV4
    },
    StageId: { type: DataTypes.UUID }, 
    UserId: { type: DataTypes.UUID }, 
    rating: { type: DataTypes.FLOAT }, 
    review: { type: DataTypes.TEXT },
  }, {
    name: { singular: 'Rating', plural: 'Ratings' }, 
    classMethods: {
      associate: function(models) {
      }
    },
    hooks: {
    },
    instanceMethods: {
    }
  });

  return Rating;
};
