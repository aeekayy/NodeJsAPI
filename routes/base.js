const apiconfig = require('../config/apiconfig');
/** Base API route
 * @ module routes/base
 * dd@ requires express
 * @ name GET/api
 */
module.exports = (app) => {
	app.get('/api/' + apiconfig.version, (req, res) => res.status(200).send({
		message: 'Welcome to the StageHunters API!'
	}));
};
