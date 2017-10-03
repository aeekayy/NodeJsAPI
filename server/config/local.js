var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy; 

const db = require('../models');
const init = require('./passport'); 

init(); 

passport.use(new LocalStrategy(function(username, password, done) {
	db.User.findOne({where: {username: username}}).then(function(user) {
		if (!user) {
			return done(null, false, { message: 'Incorrect credentials.' }); 
		}
		var passwd = user ? user.password : ''; 
	
		// check the user password
		db.User.validPassword(password, passwd, function(err, found) {
			done(err, found ? user : false); 
		});
	});
}));

module.exports = passport; 
