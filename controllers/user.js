const db = require('../models'); 
const local_passport = require('../config/local'); 
const apiconfig = require('../config/apiconfig'); 
const infusionsoft = require('../config/infusionsoft'); 
const passport = require('passport'); 
var Promise = require("bluebird");

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
					res.status(created ? 201 : 409).send( { "data": userType})
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
 					.then(userType => res.status( userType ? 200 : 400).send({"data": userType } ))
					.catch(error => res.status(400).send({ "errors":  error }))
                        }
		}, 

	// create a new user for the system 
	create(req, res) {
		//infusionsoft.ContactService
		//	.add( { FirstName: req.body.first_name, LastName: req.body.last_name, Email: req.body.email } );
		if(!req.body.username) {
			return res.status(400).send({ "errors": "Username must be set." });
		} else if(!req.body.password) {
			return res.status(400).send({ "errors": "Password must be set." });
		} else {
		return db.Address
			.create({
				zip: req.body.zip_code
			})
			.then( address => 
				db.Organization
					.create({
					organization_type: req.body.type,
					organization_address: address.id,
					organization_email: req.body.email,
				})
			)
			.then( org => {
				db.User
				.create({
					first_name: req.body.first_name,
					last_name: req.body.last_name, 
					username: req.body.username,
					email: req.body.email, 
					password_hash: req.body.password,
					organization: org.id
				})
				}
			)
			.then(user => res.status(201).send({"data": user }))
			.catch(error => res.status(400).send({"errors": error }));
		}
		},
	
	// update the user object 
	updateUser(req, res) {
		if(!req.body.username) {
			return res.status(400).send({ "errors": "Username must be set." }); 
		} else if(!req.body.email) {
			return res.status(400).send({ "errors": "Email must be set." });
		} else if(!req.body.password) {
			return res.status(400).send({ "errors": "Password must be set." }); 
		} else if(!req.body.first_name) {
			return res.status(400).send({ "errors": "First name must be set." })
		} else {
			db.User
				.update({
					first_name: req.body.first_name,
					last_name: req.body.last_name, 
					password_hash: req.body.password, 
					phone_number: req.body.phone_number
				}, {
					where: { username: req.body.username },
					returning: true
				})
				.then(user => res.status(202).send({"data": user}))
				.catch(error => res.status(400).send({"errors": error}));
		}
		
		},
	
	// update the organization object tied to a user
	updateOrganization(req, res) {
		if(!req.body.organization_type) {
			return res.status(400).send({ "errors": "Organization type must be set." });
		} else {
			db.User
				.findById(req.params.sessionId, {})
			.then( user => db.Organization
				.update({
					organization_name: req.body.organization_name, 
					organization_description: req.body.organization_description, 
					organization_rate_per_hour: req.body.organization_rate_per_hour, 
					organization_fix_rate: req.body.organization_fix_rate,
					organization_hours: req.body.organization_hours, 
					organization_email: req.body.organization_email,
					stripe_id: req.body.stripe_id
				}, {
					where: { id: user.organization },
					returning: true
				})
			)
			.then(organization => res.status(202).send({"data": organization}))
			.catch(error => res.status(400).send({"errors": error}));
		}
		},
	getProfile(req, res) {
		return db.sequelize.query('SELECT username, email, phone_number, profile_picture, first_name, last_name, first_name || \' \' || last_name AS full_name, organization_name, address_1, address_2, city, state, zip, organization as org_id, organization_type, organization_description FROM "Users" LEFT JOIN "Organizations" ON "Users".organization="Organizations".id LEFT JOIN "Addresses" ON "Organizations".organization_address="Addresses".id WHERE username=:username OR "Users".id=:uid LIMIT 1', { replacements: { uid: ( typeof req.query.uid !== 'undefined' ? req.query.uid.replace(/[^0-9a-zA-Z\-]/gi, '') : '2d1df595-e47d-40af-b7b0-0d7138bfcefb' ), username: ( typeof req.query.username !== 'undefined' ? req.query.username.replace(/[^0-9a-zA-Z\-]/gi, '') : '') }, type: db.sequelize.QueryTypes.SELECT })
		.then(users => res.status(200).send({"data":users}))
		.catch(error => res.status(400).send({"errors":error}));
		},
	getProfileURI(req, res) {
                return db.sequelize.query('SELECT username, email, phone_number, profile_picture, first_name, last_name, first_name || \' \' || last_name AS full_name, organization_name, address_1, address_2, city, state, zip, organization as org_id, organization_type, organization_description FROM "Users" LEFT JOIN "Organizations" ON "Users".organization="Organizations".id LEFT JOIN "Addresses" ON "Organizations".organization_address="Addresses".id WHERE "Users".id=:uid LIMIT 1', { replacements: { uid: ( typeof req.params.id !== 'undefined' ? req.params.id.replace(/[^0-9a-zA-Z\-]/gi, '') : '2d1df595-e47d-40af-b7b0-0d7138bfcefb' ), username: ( typeof req.params.id !== 'undefined' ? req.params.id.replace(/[^0-9a-zA-Z\-]/gi, '') : '') }, type: db.sequelize.QueryTypes.SELECT })
                .then(users => res.status(200).send({"data":users}))
                .catch(error => res.status(400).send({"errors":error}));
                }, 
	updateProfile(req, res) {
		return db.User.update( 
			{ first_name: req.body.first_name, last_name: req.body.last_name, phone_number: req.body.phone_number, email: req.body.email },
			{ where: { id: req.params.id }, returning: true } )
			.then( user => res.status(202).send({ "data": user }))
			.catch(error => res.status(400).send({"errors": error})); 
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
			.then(session => res.status(200).send({ "data": session.dataValues }))
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
