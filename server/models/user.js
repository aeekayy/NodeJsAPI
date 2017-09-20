'use strict';
var Promise = require("bluebird"); 
var bcrypt =Promise.promisifyAll(require("bcrypt-nodejs"));
const SALT_ROUNDS = 10; 

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: { type: DataTypes.STRING, unique: true, allowNull: false, validate: { notEmpty: true } }, 
    email: { type: DataTypes.STRING, unique: true, allowNull: false, isEmail: true },
    phone_number: DataTypes.STRING,
    password_hash: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { notEmpty: true } }, 
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
    hooks: {
	beforeCreate: function(user, {}) {
		bcrypt.genSalt(SALT_ROUNDS, function(err, salt) {
			bcrypt.hash(user.password_hash, salt, function(){}, function(err, hash) {
				if (err) {
					return sequelize.Promise.reject(err); 
				}

	        		user.setDataValue('password_hash',hash);
				user.setDataValue('password_salt',salt);
			});

		});
	}
    },
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

  return User;
};
