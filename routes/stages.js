/** Express Router Providering User Related Routes
 * @module routers/user
 * @requires userTypesController
 */
const stagesController = require('../controllers').stages;
const apiconfig = require('../config/apiconfig');
const sub_name = 'stages'; 

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
	app.post('/' + [ 'api', apiconfig.version, sub_name, 'create' ].join('/'), stagesController.createStageSpace);
	app.get('/' + [ 'api', apiconfig.version, sub_name, 'list' ].join('/'), stagesController.listAll);
	app.post('/' + [ 'api', apiconfig.version, sub_name, 'reset' ].join('/'), stagesController.resetStageSpaces);
	app.post('/' + [ 'api', apiconfig.version, sub_name, 'search' ].join('/'), stagesController.searchStages);
	app.post('/' + [ 'api', apiconfig.version, sub_name, 'delete' ].join('/'), stagesController.deleteStageSpace);
	app.post('/' + [ 'api', apiconfig.version, 'review' ].join('/'), stagesController.addReview);
	app.get('/' + [ 'api', apiconfig.version, 'review', ':id' ].join('/'), stagesController.getReviews);
	app.get('/' + [ 'api', apiconfig.version, sub_name, ':id' ].join('/'), stagesController.getStage);
	app.get('/' + [ 'api', apiconfig.version, 'raw', ':id' ].join('/'), stagesController.getStageRaw);
	app.get('/' + [ 'api', apiconfig.version, sub_name, 'search', 'count' ].join('/'), stagesController.getCount);

	/** Bookings
 	* @name 
 	*/
	app.post('/' + [ 'api', apiconfig.version, sub_name, ':id', 'booking' ].join('/'), stagesController.addBooking);
	app.get('/' + [ 'api', apiconfig.version, sub_name, ':id', 'booking' ].join('/'), stagesController.getBookings);
};
