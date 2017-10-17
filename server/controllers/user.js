const db = require('../models'); 
const local_passport = require('../config/local'); 
const apiconfig = require('../config/apiconfig'); 

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
		local_passport.authenticate('local', {
				successRedirect: '/Account',
				failureRedirect: '/Account/Login' 
			});
		(req, res, next) => {
				return req.session.save((error) => res.status(400).send(error));

				return res.redirect('/Dashboard');
			}
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
