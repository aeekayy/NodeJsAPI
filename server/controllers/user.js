const db = require('../models'); 
const middleware = require('../config/middleware'); 
const apiconfig = require('../config/apiconfig'); 
const passport = require('passport'); 

module.exports = {
	create(req, res) {
		return db.User
			.create({
				first_name: req.body.first_name,
				last_name: req.body.last_name, 
				username: req.body.username,
				email: req.body.email, 
				password_hash: req.body.password	
			})
			.then(user => res.status(201).send(user))
			.catch(error => res.status(400).send(error));
		},
	listAll(req, res) {
                return db.User
                        .all()
                        .then(users => res.status(200).send(users))
                        .catch(error => res.status(400).send(error));
                },
	login(req, res) {
		passport.authenticate('local', (err, user, info) => {
			if(err) { err => res.status(500).send(err); }
			if(!user) { res.status(404).send("User not found."); }
			if(user) {
				req.login(user, function(err) {
					if(err) { err => res.status(500).send(err); }
					res.status(200).send('Login successful'); 
				});
			}
			});
		}, 
	resetUsers(req, res) {
		return db.User
			.destroy({ where: {}, truncate: true})
			.then(() => res.status(200).send())
			.catch(error => res.status(400).send(error));
		},
	deleteUser(req, res) {
		return db.User
			.destroy({ where: { username: req.body.username } })
			.then(() => res.status(200).send())
			.catch(error => res.status(400).send(error)); 
		}, 

};
