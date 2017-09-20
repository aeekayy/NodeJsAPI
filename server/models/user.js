'use strict';
var bcrypt = require("bcrypt-nodejs"); 

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: { type: DataTypes.STRING, allowNull: false, isEmail: true },
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
      },
      validPassword: function(password, passwd, callback) {
        bcrypt.compare(password, passwd, function(err, isMatch) {
          if (isMatch) {
            return callback(null, true);
          } else {
            return callback(null, false); 
          }
        });
      },
    },
    /*hooks: {
	beforeCreate: function(user, password) {
		user.password_salt = bcrypt.genSaltSync(10);
		user.password_hash = bcrypt.hashSync(user.password, user.password_salt, null);
		return user; 
	}
    },*/
    instanceMethods: {
	generateHash: function(password) {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null); 
	},
	validPassword: function(password) {
		return bcrypt.compareSync(password, this.password); 
	}
    }
  });

  //User.associate = (models) => {
  //  User.hasMany(models.UserType, {
  //    foreignKey: 'userId',
  //    as: 'userTypes'
  //  });
  //};

  User.hook('beforeCreate', function(user, {}, next) {
    bcrypt.genSaltSync(10, function(err, salt) {
      if (err) {
        return next(err); 
      }
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          return next(err); 
        }
        user.password_hash = hash;
        user.password_salt = salt; 
        return next(null, user); 
      });
    });
  });
  return User;
};
