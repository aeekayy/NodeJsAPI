const db = require('../models'); 
const local_passport = require('../config/local'); 
const apiconfig = require('../config/apiconfig'); 
const passport = require('passport'); 
var Promise = require("bluebird");

module.exports = {
	getBooking(req, res) {
		if(!req.params.id && !req.body.id) {
			return res.status(401).send({ "errors": apiconfig.errors['401'] });
		}
		return db.Booking.findById(req.params.id, {})
			.then(booking => res.status(200).send({ "data": booking }))
			.catch(error => res.status(400).send({ "errors": error }));	
		},
	deleteBooking(req, res) {
		if(!req.params.id) {
			return res.status(400).send({"errors": apiconfig.errors['object_not_found'] });
		} else {
			return db.Booking.destroy({ where: { id: req.params.id } })
				.then(booking => res.status(200).send({"data": booking }))
				.catch(error => res.status(400).send({"errors": error}));
		}
		},
	updateBooking(req, res) {
		return db.Booking.update( { status: req.body.status }, { where: { id: req.params.id }, returning: true })
			.then( booking => res.status(202).send({"data": booking }))
			.catch(error => res.status(400).send({"errors": error })); 
		}, 
};
