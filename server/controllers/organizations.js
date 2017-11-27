const apiconfig = require('../config/apiconfig');
const db = require('../models');
const node_geocoder = require('node-geocoder'); 
const local_passport = require('../config/local'); 
const passport = require('passport'); 
const stripe = require('../config/stripe'); 

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
				organization_email: req.body.organization_email, 
				organization_type: req.body.organization_type
			}
			)
			.then(organization => res.status(201).send(organization))
			.catch(error => res.status(400).send(error));
		},
	getStage(req, res) {
		return db.Organization
			.findById(req.params.id)
			.then(organization => res.status(200).send(organization))
			.catch(error => res.status(400).send(error));
		},
	createSubscription(req, res) {
		return db.Organization
			.findById(req.params.id)
			.then(organization => return stripe.subscriptions.create({
				customer: organization.stripe_id,
				items: [
				{
					plan: req.subscription_plan
				},
				]
			})
			.then(subscription => res.status(200).send(subscription))
			.catch(error => res.status(400).send(error));
		},
	updateSubscription(req, res) {
		return db.Organiztion
			.findById(req.params.id)
			.then(organization => {
				return stripe.customers.retrieve({organization.stripe_id});
			})
			.then(customer => {
				return stripe.subscriptions.update(customer.subscriptions.data[0], { tax_percent: 8.5 });
			})
			.then(subscription => res.status(200).send(subscription))
			.catch(error => res.status(400).send(error));
		},
	deleteSubscription(req, res) { 
		return db.Organization
			.findById(req.params.id)
			.then( organization => {
				return stripe.customers.retrieve({organization.stripe_id});
			})
			.then(customer => {
				return stripe.subscriptions.del(customer.subscriptions.data[0]);
			})
			.then(confirmation => res.status(200).send(confirmation))
			.catch(error => res.status(400).send(error));
		},
	searchStages(req, res) {
		if(!req.body.search_offset) { return res.status(400).send("Please provide an offset."); }
		geocoder.geocode(req.body.search_user_location)
			.then(geocoding => {
				db.sequelize
				.query("SELECT id, organization_name, organization_description, organization_coordinate, round(CAST(ST_DistanceSphere(organization_coordinate, ST_GeomFromText('POINT(" + geocoding[0].latitude + " " + geocoding[0].longitude + ")', 4326)) as numeric)*0.000621371, 2) as distance, ts_rank_cd(search_organization_idx, to_tsquery('" + req.body.search_query + "')) as rank FROM \"Organizations\" WHERE search_organization_idx @@ plainto_tsquery('english', '" + req.body.search_query + "') ORDER BY rank DESC, distance DESC LIMIT 10 OFFSET 10*" + req.body.search_offset + ";")
				.then(organizations => res.status(200).send(organizations))
				.catch(error => res.status(400).send(error)); 
			});
		},
	listAll(req, res) {
                return db.Organization
                        .all()
                        .then(organizations => res.status(200).send(organizations))
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
