const apiconfig = require('../config/apiconfig');
const db = require('../models');
const node_geocoder = require('node-geocoder'); 
const local_passport = require('../config/local'); 
const passport = require('passport'); 

var geocoder = node_geocoder(apiconfig.node_geocoder_options);

module.exports = {
	test(req, res) {
			return geocoder.geocode('47 Discovery, Irvine, CA')
				.then(geocoding => res.status(200).send(geocoding));
		}, 
	createStageSpace(req, res) {
		return db.StageSpace
			.create({
				stage_name: req.body.stage_name, 
				addresses: [{
					stage_address_1: req.body.stage_address_1,
					stage_address_2: req.body.stage_address_2, 
					stage_city: req.body.stage_city,
					stage_state: req.body.stage_state,
					stage_zip: req.body.stage_zip
				}]
			}, {
				include: [{
					association: db.StageSpace,
					include: [ db.StageSpace.Addresses ]
				}]
			}
			)
			.then(stagespace => res.status(201).send(stagespace))
			.catch(error => res.status(400).send(error));
		},
	listAll(req, res) {
                return db.StageSpace
                        .all()
                        .then(stagespaces => res.status(200).send(stagespaces))
                        .catch(error => res.status(400).send(error));
                },
	resetStageSpaces(req, res) {
		return db.StageSpace
			.destroy({ where: {}, truncate: true})
			.then(() => res.status(200).send())
			.catch(error => res.status(400).send(error));
		},
	deleteStageSpace(req, res) {
		return db.StageSpace
			.destroy({ where: { id: req.body.id } })
			.then(() => res.status(200).send())
			.catch(error => res.status(400).send(error)); 
		}, 

};
