'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: { type: DataTypes.STRING, allowNull: false, },
    phone_number: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    password_salt: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    user_type: DataTypes.INTEGER,
    two_factor_enabled: { type: DataTypes.BOOLEAN, defaultValue: false, },
    email_verified: DataTypes.DATE,
    active: { type: DataTypes.BOOLEAN, defaultValue: true, },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  User.associate = (models) => {
    User.hasMany(models.UserType, {
      foreignKey: 'userId',
      as: 'userTypes'
    });
  };

  return User;
};
