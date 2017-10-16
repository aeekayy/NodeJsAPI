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
				stage_description: req.body.stage_description,
				stage_address_1: req.body.stage_address_1,
				stage_address_2: req.body.stage_address_2, 
				stage_city: req.body.stage_city,
				stage_state: req.body.stage_state,
				stage_zip: req.body.stage_zip
			}
			)
			.then(stagespace => res.status(201).send(stagespace))
			.catch(error => res.status(400).send(error));
		},
	getStage(req, res) {
		return db.StageSpace
			.findById(req.params.id)
			.then(stagespace => res.status(200).send(stagespace))
			.catch(error => res.status(400).send(error));
		},
	searchStages(req, res) {
		if(!req.body.search_offset) { return res.status(400).send("Please provide an offset."); }
		geocoder.geocode(req.body.search_user_location)
			.then(geocoding => {
				db.sequelize
				.query("SELECT id, stage_name, stage_description, stage_coordinate, round(CAST(ST_DistanceSphere(stage_coordinate, ST_GeomFromText('POINT(" + geocoding[0].latitude + " " + geocoding[0].longitude + ")', 4326)) as numeric)*0.000621371, 2) as distance, ts_rank_cd(search_stage_space_idx, to_tsquery('" + req.body.search_query + "')) as rank FROM \"StageSpaces\" WHERE search_stage_space_idx @@ plainto_tsquery('english', '" + req.body.search_query + "') ORDER BY rank DESC, distance DESC LIMIT 10 OFFSET 10*" + req.body.search_offset + ";")
				.then(stagespaces => res.status(200).send(stagespaces))
				.catch(error => res.status(400).send(error)); 
			});
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
