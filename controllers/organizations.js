const apiconfig = require('../config/apiconfig');
const db = require('../models');
const node_geocoder = require('node-geocoder'); 
const local_passport = require('../config/local'); 
const passport = require('passport'); 
var Promise = require("bluebird");
const stripe = require('../config/stripe'); 
const uuidv4 = require('uuid/v4');

var geocoder = node_geocoder(apiconfig.node_geocoder_options);

module.exports = {
	// create an organization. Usually this operation is tied to a user creation. 
	createOrganization(req, res) {
		return db.Organization
			.findAll({ where: { organization_email: req.body.organization_email }})
			.then( results => {
				if (results.length) { throw new Error("Can not register with that email address as that email address has an account already!")}
			})
			.then(noerror => db.Address
					.create({
						address_1: req.body.organization_address_1,
						address_2: req.body.organization_address_2,
						city: req.body.organization_city,
						state: req.body.organization_state,
						zip: req.body.organization_zip 
					})
			)
			.then(address => db.Organization
				.create({
					organization_name: req.body.organization_name,
					organization_description: req.body.organization_description,
					organization_address: address.id,
					organization_email: req.body.organization_email, 
					organization_type: req.body.organization_type
				})
			)
			.then(organization => res.status(201).send({"data":organization}))
			.catch(error => { (error.message.startsWith("Can not") ? res.status(409).send({"errors": error.message }) : res.status(400).send({"errors": error })) });
		},
	getStage(req, res) {
		return db.Organization
			.findById(req.params.id)
			.then(organization => res.status(200).send({"data":organization}))
			.catch(error => res.status(400).send({"errors":error}));
		},
	createSubscription(req, res) {
		return db.Organization
			.findById(req.params.id)
			.then(organization => stripe.subscriptions.create({
				customer: organization.stripe_id,
				items: [
				{
					plan: req.subscription_plan
				},
				]
				})
			)
			.then(subscription => res.status(200).send(subscription))
			.catch(error => res.status(400).send(error));
		},
	updateSubscription(req, res) {
		return db.Organiztion
			.findById(req.params.id)
			.then(organization => {
				return stripe.customers.retrieve(organization.stripe_id);
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
				return stripe.customers.retrieve(organization.stripe_id);
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
			.then(() => res.status(202).send({"data": "Organization deleted." }))
			.catch(error => res.status(400).send({"error":error})); 
		},
	joinOrganization(req, res) {
		return db.User
			.update( { organization: req.params.id }, { where: { id: req.body.uid }, returning: true })
			.then( user => res.status(202).send({"data": user }))
                        .catch(error => res.status(400).send({"errors": error }));
		},
	getMembers(req, res) {
		return db.User
			.findAll({ where: { organization: req.params.id }})
			.then( users => res.status(200).send({"data":users}) )
			.catch(error => res.status(400).send({"errors": error}));
		},
	inviteMember(req, res) {
		return db.User
			.create({
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				email: req.body.email,
				username: uuidv4(),
				password_hash: req.body.password,
				organization: req.params.id
			})
			.then( user => res.status(201).send({"result": "User invited!", "data": user}))
			.catch(error => res.status(400).send({"errors": error}));
		}, 
	addStage(req, res) {
		return db.OrganizationStage
			.create({
				OwnerId: req.params.id, 
				StageId: req.body.StageId
			})
			.then( orgstage => res.status(201).send({"result": "Stage added", "data": orgstage }))
			.catch(error => res.status(400).send({"errors": error}));
		},
	listStage(req, res) {
		return db.OrganizationStage
			.findAll({where: { OwnerId: req.params.id}, include: [{ model: db.StageSpace, as: 'Stage' }] })
			.then( stages => res.status(200).send( { data: stages } ))
			.catch(error => res.status(400).send({error: error}) && console.log(error));
		}, 
	deleteStage(req, res) {
		return db.OrganizationStage
			.destroy({ where: { StageId: req.body.stage_id }})
			.then(() => res.status(202).send({data: "Stage deleted from organization"}))
			.catch(error => res.status(400).send({"error": error}));
		},
	// delete organization by id 
	deleteOrganizationId(req, res) {
		return db.Organization
			.destroy({ where: { id: req.params.id } })
			.then(() => res.status(202).send({"data": "Organization deleted."}))
			.catch(error => res.status(400).send({"error": error}));
		},

	/*******************************
 *  Get the bookings by teams/organizations
 *
 *  ************************************/
	getBookings(req, res) {
		return db.Booking
			.findAll({ where: { reserver: req.params.id }})
			.then(bookings => res.status(200).send({"data": bookings}))
			.catch(error => res.status(400).send({"error": error }));
		},
};
