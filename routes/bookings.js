/** Express Router Providering User Related Routes
 * @module routers/bookings
 * @requires bookingController
 */
const bookingController = require('../controllers').bookings; 
const apiconfig = require('../config/apiconfig');
const sub_name = 'bookings';
/* load the AWS configuration */

module.exports = (app) => {
	app.get('/' + [ 'api', apiconfig.version, sub_name, ':id'].join('/'), bookingController.getBooking);
	// app.post('/' + [ 'api', apiconfig.version, sub_name ].join('/'), upload.single('booking'), bookingController.addImage);
	app.delete('/' + [ 'api', apiconfig.version, sub_name, ':id' ].join('/'), bookingController.deleteBooking);
	app.put('/' + [ 'api', apiconfig.version, sub_name, ':id' ].join('/'), bookingController.updateBooking);
};
