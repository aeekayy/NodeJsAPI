const db = require('../models'); 
const local_passport = require('../config/local'); 
const apiconfig = require('../config/apiconfig'); 
const infusionsoft = require('../config/infusionsoft'); 
const passport = require('passport'); 
var Promise = require("bluebird");
const stringifyObject = require("stringify-object");

module.exports = {
	// get the permissions of the user. Can a user perform the action that they are trying to do
	// 
	getAcl(req, res) {
		if(!req.params.sessionId && !req.body.sessionId) {
			return res.status(401).send({ "errors": apiconfig.errors['401'] });
		}
		return db.Session.findById(req.params.sessionId, {})
			.then(acl => res.status(200).send({ "data": true  }))
			.catch(error => res.status(400).send({ "errors": error }));	
		},
	// create a user type for the system 
	createUserType(req, res) {
			if(!req.body.typename || req.body.typename.trim() == "") {
				return res.status(400).send({ "errors": apiconfig.errors['object_not_found'] });
			} else {
				return db.UserType.findOrCreate({ where: {typename: req.body.typename.trim().toLowerCase()}, defaults: { description: req.body.description.trim() }})
				.spread((userType, created) => {
					res.status(created ? 201 : 409).send( { "data": stringifyObject(userType)})
				})
				.catch(error => res.status(400).send({ "errors":  error }));
				return res.status(409).send({ "errors": apiconfig.errors['user_type_exists'] });
			}
		},
	// delete a user type from the system by name
	deleteUserType(req, res) {
			if(!req.body.typename || req.body.typename.trim() == "") {
                                return res.status(400).send({ "errors": apiconfig.errors['object_not_found'] });
                        } else {
                                return db.UserType.destroy({ where: {typename: req.body.typename.trim().toLowerCase()} })
 					.then(userType => res.status( userType ? 200 : 400).send({"data": stringifyObject(userType) } ))
					.catch(error => res.status(400).send({ "errors":  error }))
                        }
		}, 
	create(req, res) {
		infusionsoft.ContactService
			.add( { FirstName: req.body.first_name, LastName: req.body.last_name, Email: req.body.email } );
		return db.Address
			.create({
				zip: req.body.zip_code
			})
			.then( address => 
				db.Organization
					.create({
					organization_type: req.body.type,
					organization_address: address.id,
					orangization_email: req.body.email,
					organization_type: req.body.UserType
				})
			)
			.then( org =>
				db.User
				.create({
					first_name: req.body.first_name,
					last_name: req.body.last_name, 
					username: req.body.username,
					email: req.body.email, 
					password_hash: req.body.password,
					organization: org.id
				})
			)
			.then(user => res.status(201).send({"data": stringifyObject(user) }))
			.catch(error => res.status(400).send({"errors": stringifyObject(error) }));
		},
	getProfile(req, res) {
		return db.sequelize.query('SELECT username, email, phone_number, first_name || \' \' || last_name AS full_name, organization_name, organization_address_1, organization_address_2, organization_city, "Organizations".organization_state, organization_type, organization_description FROM "Users" LEFT JOIN "Organizations" ON "Users".organization="Organizations".id WHERE username=:username LIMIT 1', { replacements: { username: req.query.username }, type: db.sequelize.QueryTypes.SELECT })
		.then(users => res.status(200).send({"data":users}))
		.catch(error => res.status(400).send({"errors":error}));
		}, 
	listAll(req, res) {
                return db.User
                        .all()
                        .then(users => res.status(200).send(users))
                        .catch(error => res.status(400).send(error));
                },

	// login for the user
	login(req, res) {
		let promise = new Promise(function(resolve, reject) {
			passport.authenticate('local', function(err, user, info) {
				if (err) {
					reject(err); 
				}
				else { 
					let session = db.Session
					.findOne({ 
						where: {
							username: user.username
						}
					}); 
					resolve(session);
				}
			})(req, res);
		});
		// retrieve the user's information and return it to the user
		return promise
			.then(session => res.status(200).send({ "data": stringifyObject(session.dataValues) }))
			.catch(err => res.status(535).send({ "errors": err }));
		},

	session(req, res) {
		return db.Session.findById((Object.keys(req.query.id).length === 0) ? req.body.session_id : req.query.id)
			.then(session => res.status(200).send(session))
			.catch(err => res.status(535).send(err)); 
		},

	// delete all users from the system
	resetUsers(req, res) {
		return db.User
			.destroy({ where: {}, truncate: true})
			.then(() => res.status(200).send({"data": "All users have been deleted." }))
			.catch(error => res.status(400).send({"errors": error }));
		},
	deleteUser(req, res) {
		return db.User
			.destroy({ where: { username: req.body.username } })
			.then(() => res.status(200).send())
			.catch(error => res.status(400).send(error)); 
		}, 

};
