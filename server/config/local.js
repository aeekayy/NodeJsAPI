var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy; 
var bcrypt = require("bcrypt-nodejs");

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

			if(bcrypt.compareSync(password, user.password_hash)) {
				session = db.Session.findOne({ where: {username: username}}); 
				if(!session) {
					db.Session.Create( { username: username });
				}
				return done(null, user); 
			}
			else {
				return done(null, false, { message: 'Incorrect credentials.' });
			}
	});
}));

module.exports = passport; 
