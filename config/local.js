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
			else if (!user) {
				return done('Incorrect credentials.'); 
			}
			else if(bcrypt.compareSync(password, user.password_hash)) {
				session = db.Session.findCreateFind({ where: {username: username}}).
					then( function()  { return done(null, user)} );
			}
			else {
				return done('Incorrect credentials.');
			}
	});
}));

module.exports = passport; 
