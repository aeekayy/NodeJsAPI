var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy; 

const db = require('../models');
const init = require('./passport_config'); 

init(); 

passport.use(new LocalStrategy(function(username, password, done) {
	var hashedPassword = bcrypt.hashSync(password); 
	db.User.findOne({where: {username: username}})
		.then(function(user, err) {
			if (err) { return done(err); }
			
			if (!user) {
				return done(null, false, { message: 'Incorrect credentials.' }); 
			}

			var passwd = user ? user.password_hash : ''; 
	
			// check the user password
			db.User.validPassword(hashedPassword, passwd, function(err, found) {
				done(err, found ? user : false); 
			});
	});
}));

module.exports = passport; 
