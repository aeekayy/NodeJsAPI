/** Express Router Providering User Related Routes
 * @module routers/user
 * @requires userTypesController
 */
const organizationsController = require('../controllers').organizations;
const apiconfig = require('../config/apiconfig');
const sub_name = 'profile'; 

/** Create a User Type.
 * @name POST/api/user/type
 * @function userTypesController.create
 * @param {string} typename - Name of the New Type
 * @param {text} description - Description of the New Type
 */

/** List User Type With ID
 * @name GET/api/user/type/:userTypeId
 * @function userTypesController.retrieve
 * @param (integer) userTypeId - The User Type ID
 */

/** List All User Types.
 * @name GET/api/user/types
 * @function userTypesController.listAll
 */
module.exports = (app) => {
	app.delete('/' + [ 'api', apiconfig.version, sub_name, ':id' ].join('/'), organizationsController.deleteOrganizationId);
	app.post('/' + [ 'api', apiconfig.version, sub_name, 'create' ].join('/'), organizationsController.createOrganization);

	app.get('/' + [ 'api', apiconfig.version, sub_name ].join('/'), organizationsController.listAll);
	app.post('/' + [ 'api', apiconfig.version, sub_name, 'reset' ].join('/'), organizationsController.resetOrganizations);
	app.post('/' + [ 'api', apiconfig.version, sub_name, 'search' ].join('/'), organizationsController.searchStages);
	app.post('/' + [ 'api', apiconfig.version, sub_name, 'delete' ].join('/'), organizationsController.deleteOrganization);
	app.post('/'+ [ 'api', apiconfig.version, sub_name, 'join' ].join('/'), organizationsController.joinOrganization); 
	app.get('/' + [ 'api', apiconfig.version, sub_name, ':id' ].join('/'), organizationsController.getStage);
	app.post('/' + [ 'api', apiconfig.version, sub_name, ':id', 'subscribe' ].join('/'), organizationsController.createSubscription);
	app.post('/' + [ 'api', apiconfig.version, sub_name, ':id', 'cancel-subscription' ].join('/'), organizationsController.deleteSubscription);
	app.post('/' + [ 'api', apiconfig.version, sub_name, ':id', 'update-subscription' ].join('/'), organizationsController.updateSubscription); 

	// User membership
	// *****************
	app.get('/' + [ 'api', apiconfig.version, sub_name, ':id', 'members' ].join('/'), organizationsController.getMembers);
	app.post('/' + [ 'api', apiconfig.version, sub_name, ':id', 'invite' ].join('/'), organizationsController.inviteMember);


	// Stage Membership
	// *****************
	app.post('/' + [ 'api', apiconfig.version, sub_name, ':id', 'stage' ].join('/'), organizationsController.addStage);
	app.get('/' + [ 'api', apiconfig.version, sub_name, ':id', 'stage' ].join('/'), organizationsController.listStage); 
	app.delete('/' + [ 'api', apiconfig.version, sub_name, ':id', 'stage' ].join('/'), organizationsController.deleteStage);

	// Bookings
	// *****************
	app.get('/' + [ 'api', apiconfig.version, sub_name, ':id', 'bookings' ].join('/'), organizationsController.getBookings);
};
