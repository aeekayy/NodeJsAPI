const Session = require('../models').Session;
const UserType = require('../models').UserType; 
const User = require('../models').User;

module.exports = {
	create(req, res) {
		return User
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
                return User
                        .all()
                        .then(users => res.status(200).send(users))
                        .catch(error => res.status(400).send(error));
                },

};
