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
	app.get('/api/user/type/:userTypeId', userTypesController.retrieve);
	app.get('/api/user/types', userTypesController.listAll);
	app.post('/api/user/type', userTypesController.create);
};
