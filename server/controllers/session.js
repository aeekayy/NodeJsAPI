const db = require('../models'); 
const local_passport = require('../config/local'); 
const apiconfig = require('../config/apiconfig'); 
const infusionsoft = require('../config/infusionsoft'); 
const passport = require('passport'); 
var Promise = require("bluebird");

module.exports = {
	listAll(req, res) {
                return db.User
                        .all()
                        .then(users => res.status(200).send(users))
                        .catch(error => res.status(400).send(error));
                },
	login(req, res) {
		let promise = new Promise(function(resolve, reject) {
			passport.authenticate('local', function(err, user, info) {
				if (err) {
					reject(err); 
				}
				resolve(user);
			})(req, res);
		});
		return promise
			.then(user => res.status(200).send(user))
			.catch(err => res.status(400).send(err));
		}, 
	deleteSession(req, res) {
		return db.Session
			.destroy({ where: { username: req.body.username } })
			.then(() => res.status(200).send())
			.catch(error => res.status(400).send(error)); 
		}, 

};
