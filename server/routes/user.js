/** Express Router Providering User Related Routes
 * @module routers/user
 * @requires userTypesController
 */
const userTypesController = require('../controllers').userTypes; 

/** Create a User Type.
 * @name POST/api/user/type
 * @function userTypesController.create
 * @param {string} typename - Name of the New Type
 * @param {text} description - Description of the New Type
 */
module.exports = (app) => {
	app.post('/api/user/type', userTypesController.create);
};
