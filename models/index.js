'use strict';

const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const SearchModel = require('pg-search-sequelize');
const basename  = path.basename(module.filename);
const env       = process.env.NODE_ENV || 'development';
const config    = require(__dirname + '/../config/config.json')[env];
const db        = {};

let sequelize

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], {logging: function(str) {console.log(str)}});
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file =>
     (file.indexOf('.') !== 0) &&
     (file !== basename) &&
     (file.slice(-3) === '.js'))
  .forEach(file => {
     const model = sequelize.import(path.join(__dirname, file));
     db[model.name] = model;
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Define relations and associations
//
// db.Organization.hasOne(db.Address, { foreignKey: 'organization_address', sourceKey: 'id', as: 'address' });
db.Organization.hasMany(db.User, { foreignKey: 'organization', sourceKey: 'id', as: 'users' });
// db.StageSpace.hasOne(db.Address, { foreignKey: 'id', targetKey: 'stage_address', as: 'address' });
db.Address.belongsTo(db.StageSpace, { foreignKey: 'id', targetKey: 'stage_address', as: 'address' });
// db.Organization.hasMany(db.User, { foreignKey: 'ratings', sourceKey: 'id', as: 'users' });
db.User.belongsTo(db.Organization, { foreignKey: 'organization', targetKey: 'id', as: 'user_organization' });
db.User.hasMany(db.Rating, { foreginKey: 'id', as: 'Ratings' });
db.Rating.belongsTo( db.User, { foreginKey: 'id', sourceKey: 'source_id', as: 'User' });
db.Rating.belongsTo( db.StageSpace, { foreignKey: 'StageId', targetKey: 'id', as: 'stage' });

module.exports = db;
