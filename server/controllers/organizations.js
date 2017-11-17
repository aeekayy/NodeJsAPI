const apiconfig = require('../config/apiconfig');
const db = require('../models');
const node_geocoder = require('node-geocoder'); 
const local_passport = require('../config/local'); 
const passport = require('passport'); 

var geocoder = node_geocoder(apiconfig.node_geocoder_options);

module.exports = {
	createOrganization(req, res) {
		return db.Organization
			.create({
				organization_name: req.body.organization_name,
				organization_description: req.body.organization_description,
				organization_address_1: req.body.organization_address_1,
				organization_address_2: req.body.organization_address_2, 
				organization_city: req.body.organization_city,
				organization_state: req.body.organization_state,
				organization_zip: req.body.organization_zip,
				organization_type: req.body.organization_type
			}
			)
			.then(organizationspace => res.status(201).send(organizationspace))
			.catch(error => res.status(400).send(error));
		},
	getStage(req, res) {
		return db.Organization
			.findById(req.params.id)
			.then(organizationspace => res.status(200).send(organizationspace))
			.catch(error => res.status(400).send(error));
		},
	searchStages(req, res) {
		if(!req.body.search_offset) { return res.status(400).send("Please provide an offset."); }
		geocoder.geocode(req.body.search_user_location)
			.then(geocoding => {
				db.sequelize
				.query("SELECT id, organization_name, organization_description, organization_coordinate, round(CAST(ST_DistanceSphere(organization_coordinate, ST_GeomFromText('POINT(" + geocoding[0].latitude + " " + geocoding[0].longitude + ")', 4326)) as numeric)*0.000621371, 2) as distance, ts_rank_cd(search_organization_space_idx, to_tsquery('" + req.body.search_query + "')) as rank FROM \"Organizations\" WHERE search_organization_space_idx @@ plainto_tsquery('english', '" + req.body.search_query + "') ORDER BY rank DESC, distance DESC LIMIT 10 OFFSET 10*" + req.body.search_offset + ";")
				.then(organizationspaces => res.status(200).send(organizationspaces))
				.catch(error => res.status(400).send(error)); 
			});
		},
	listAll(req, res) {
                return db.Organization
                        .all()
                        .then(organizationspaces => res.status(200).send(organizationspaces))
                        .catch(error => res.status(400).send(error));
                },
	resetOrganizations(req, res) {
		return db.Organization
			.destroy({ where: {}, truncate: true})
			.then(() => res.status(200).send())
			.catch(error => res.status(400).send(error));
		},
	deleteOrganization(req, res) {
		return db.Organization
			.destroy({ where: { id: req.body.id } })
			.then(() => res.status(200).send())
			.catch(error => res.status(400).send(error)); 
		}, 

};
