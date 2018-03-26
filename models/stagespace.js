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
    rating: { type: DataTypes.FLOAT },
  }, {
    classMethods: {
      associate: function(models) {
	StageSpace.hasOne( models.Address, { as: 'stage_address' });
      },
      getStage: function(id) {
                return sequelize.query('select stage_name, "Addresses".address_1 AS street_address, "Addresses".city AS city, "Addresses".state AS geo_state, "Addresses".zip AS zip_code, "Addresses".coordinate AS geo_coordinate, stage_description, stage_rate_per_hour, stage_fix_rate, stage_hours, round(rating * 2)/2 AS rating from "StageSpaces" LEFT OUTER JOIN "Addresses" ON "StageSpaces".stage_address = "Addresses".id WHERE "StageSpaces".id = :stageId', {
                raw: true,
                replacements: { stageId: id },
                type: QueryTypes.SELECT
                });
        }
    },
    hooks: {
    },
    instanceMethods: {
    }
  });

  return StageSpace;
};
