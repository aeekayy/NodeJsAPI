const apiconfig = require('../config/apiconfig');
const db = require('../models');
const node_geocoder = require('node-geocoder'); 
const local_passport = require('../config/local'); 
const passport = require('passport'); 

var geocoder = node_geocoder(apiconfig.node_geocoder_options);

module.exports = {
	createStageSpace(req, res) {
		return db.Address
			.create({
				address_1: req.body.stage_address_1,
				address_2: req.body.stage_address_2,
				city: req.body.stage_city,
				state: req.body.stage_state,
				zip: req.body.stage_zip
			})
			.then( address => db.StageSpace
			.create({
				stage_name: req.body.stage_name,
				stage_description: req.body.stage_description,
				stage_address: address.id,
				stage_rate_per_hour: req.body.rate_per_hour,
				stage_fix_rate: req.body.fix_rate,
				stage_hours: req.body.hours
			}
			) )
			.then(stagespace => res.status(201).send(stagespace))
			.catch(error => res.status(400).send(error));
		},
	getStage(req, res) {
		return db.sequelize
			.query("SELECT stage_name, \"Addresses\".address_1 AS street_address, \"Addresses\".city AS city, \"Addresses\".state AS geo_state, \"Addresses\".zip AS zip_code, \"Addresses\".coordinate AS geo_coordinate, stage_description, stage_rate_per_hour, stage_fix_rate, stage_hours, round(rating * 2)/2 AS rating, array_to_json(array_agg(to_json('{ \"image_url\": \"' || \"Images\".image_url || '\", \"description\": \"' || CASE WHEN \"Images\".description IS NULL THEN 'No description' ELSE \"Images\".description END || '\"}'))) as image_urls from \"StageSpaces\" LEFT OUTER JOIN \"Addresses\" ON \"StageSpaces\".stage_address = \"Addresses\".id LEFT JOIN \"Images\" ON \"Images\".owner_id = \"StageSpaces\".id WHERE \"StageSpaces\".id ='" + req.params.id + "'  GROUP BY \"StageSpaces\".id, \"Addresses\".id;")
			.then(stagespace => res.status(200).send({ data: stagespace[0] }))
			.catch(error => res.status(400).send(error));
		},
	getStageRaw(req, res) {
		return db.StageSpace
			.findAll({where: { id: req.params.id }, include: [{ model: db.Address, as: 'address' }], limit: 1 })
			.then( stage => res.status(200).send({data: stage}))
			.catch(error => res.status(400).send({ error: error }) && console.log(error)); 
		},
	getCount(req, res) {
                geocoder.geocode(req.query.search_user_location)
                        .then(geocoding => {
                                return db.sequelize
                                .query("SELECT count(*) FROM \"StageSpaces\"  INNER JOIN \"Addresses\" ON \"StageSpaces\".stage_address = \"Addresses\".id WHERE search_stage_space_idx @@ plainto_tsquery('english', '" + req.query.search_query + "') AND round(CAST(ST_DistanceSphere(\"Addresses\".coordinate, ST_GeomFromText('POINT(34.0522342 -118.2436849)', 4326)) as numeric)*0.000621371, 2) < 50;")
                                .then(count => res.status(200).send( { data: count[0][0] }))
                                .catch(error => res.status(400).send( { error: error }));
                        });
                },
	// add a review from the authenticated user
	//
	addReview(req, res) {
		return db.Rating
			.create({
				StageId: req.body.StageId, 
				UserId: req.body.UserId, 
				rating: req.body.rating, 
				review: req.body.review
			})
			.then(rating => res.status(201).send({ data: rating }))
			.catch(error => res.status(400).send( { error: error }));
		},
	// Get a list of reviews by stage id
	//
	getReviews(req, res) {
		return db.Rating
			.findAll({where: { StageId: req.params.id }, include: [{ model: db.User, as: 'User' }], limit: 5, offset: req.query.offset} )
			.then( ratings => { res.status(200).send({data: ratings }) })
			.catch(error => res.status(400).send( { error: error }));
		}, 
	searchStages(req, res) {
		if(!req.body.search_offset) { return res.status(400).send("Please provide an offset."); }
		geocoder.geocode(req.body.search_user_location)
			.then(geocoding => {
				db.sequelize
				.query("SELECT \"StageSpaces\".id, stage_name, stage_description, stage_rate_per_hour AS price, \"Addresses\".coordinate, \"Addresses\".city, round(CAST(ST_DistanceSphere(\"Addresses\".coordinate, ST_GeomFromText('POINT(" + geocoding[0].latitude + " " + geocoding[0].longitude + ")', 4326)) as numeric)*0.000621371, 2) as distance, ts_rank_cd(search_stage_space_idx, to_tsquery('" + req.body.search_query + "')) as rank, round(rating * 2)/2 AS rating, array_to_json(array_agg(to_json('{ \"image_url\": \"' || \"Images\".image_url || '\", \"description\": \"' || CASE WHEN \"Images\".description IS NULL THEN 'No description' ELSE \"Images\".description END || '\"}'))) as image_urls FROM \"StageSpaces\" LEFT JOIN \"Images\" ON \"StageSpaces\".id = \"Images\".owner_id JOIN \"Addresses\" ON \"StageSpaces\".stage_address = \"Addresses\".id WHERE search_stage_space_idx @@ plainto_tsquery('english', '" + req.body.search_query + "') AND round(CAST(ST_DistanceSphere(\"Addresses\".coordinate, ST_GeomFromText('POINT(" + geocoding[0].latitude + " " + geocoding[0].longitude + ")', 4326)) as numeric)*0.000621371, 2) < 50 GROUP BY \"StageSpaces\".id, \"Addresses\".id ORDER BY rank DESC, distance DESC LIMIT 10 OFFSET 10*" + req.body.search_offset + ";")
				.then(stagespaces => res.status(200).send( { data: stagespaces[0] }))
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
