const db = require('../models'); 
const local_passport = require('../config/local'); 
const apiconfig = require('../config/apiconfig'); 
const passport = require('passport'); 
var Promise = require("bluebird");

module.exports = {
	// get the permissions of the user. Can a user perform the action that they are trying to do
	// 
	getImage(req, res) {
		if(!req.params.id && !req.body.id) {
			return res.status(401).send({ "errors": apiconfig.errors['401'] });
		}
		return db.Image.findById(req.params.id, {})
			.then(image => res.status(200).send({ "data": image }))
			.catch(error => res.status(400).send({ "errors": error }));	
		},
	deleteImage(req, res) {
		if(!req.params.id) {
			return res.status(400).send({"errors": apiconfig.errors['object_not_found'] });
		} else {
			return db.Image.destroy({ where: { id: req.params.id } })
				.then(image => res.status(200).send({"data": image }))
				.catch(error => res.status(400).send({"errors": error}));
		}
		},
	updateImage(req, res) {
		return db.Image.update( { description: req.body.description, image_url: req.body.image_url }, { where: { id: req.params.id }, returning: true })
			.then( image => res.status(202).send({"data": image }))
			.catch(error => res.status(400).send({"errors": error })); 
		}, 
	addImage(req, res) {
		return db.Image.create({
				id: req.file.key,
				description: req.body.description,
				owner_id: req.body.owner_id, 
				image_url: req.file.location,
				original_name: req.file.originalname
				/* original_name is still not being set but it's not critical */
			})
			.then( image => res.status(201).send({"data": image }))
			.catch(error => res.status(400).send({"errors": error }));
		}, 	
};
