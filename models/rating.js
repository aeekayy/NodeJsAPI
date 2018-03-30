'use strict';

module.exports = function(sequelize, DataTypes) {
  var Rating = sequelize.define('Rating', {
    id: {
       type: DataTypes.UUID, 
       primaryKey: true,
       defaultValue: DataTypes.UUIDV4
    },
    stage_id: { type: DataTypes.UUID }, 
    user_id: { type: DataTypes.UUID }, 
    rating: { type: DataTypes.FLOAT }, 
    review: { type: DataTypes.TEXT },
  }, {
    classMethods: {
      associate: function(models) {
	Rating.hasOne( models.StageSpace, { as: 'stage_id' });
	Rating.hasOne( models.User, { as: 'user_id' }); 
      }
    },
    hooks: {
    },
    instanceMethods: {
    }
  });

  return Rating;
};
