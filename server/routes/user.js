/** Express Router Providering User Related Routes
 * @module routers/user
 * @requires userTypesController
 */
const loginController = require('../controllers').login;
const userController = require('../controllers').user;
const userTypesController = require('../controllers').userTypes; 
const apiconfig = require('../config/apiconfig');
const sub_name = 'user';

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
	// ACL stuff dealing with permissions 
	app.get('/' + [ 'api', apiconfig.version, sub_name, 'acl'].join('/'), userController.getAcl);
	app.get('/' + [ 'api', apiconfig.version, sub_name, 'acl', ':sessionId'].join('/'), userController.getAcl);

	// User type stuff
	app.delete('/' + [ 'api', apiconfig.version, sub_name, 'type'].join('/'), userController.deleteUserType);
	app.post('/' + [ 'api', apiconfig.version, sub_name, 'type'].join('/'), userController.createUserType); 

	app.post('/api/' + apiconfig.version + '/user/create', userController.create);
	app.get('/api/' + apiconfig.version + '/users', userController.listAll);
	app.post('/api/' + apiconfig.version + '/users/reset', userController.resetUsers);
	app.post('/api/' + apiconfig.version + '/users/delete', userController.deleteUser);
	app.post('/api/' + apiconfig.version + '/user/login', userController.login);
	app.get('/api/' + apiconfig.version + '/user/profile', userController.getProfile); 
	app.get('/api/' + apiconfig.version + '/user/session', userController.session); 
	app.get('/api/' + apiconfig.version + '/user/type/:userTypeId', userTypesController.retrieve);
	app.get('/api/' + apiconfig.version + '/user/types', userTypesController.listAll);
	//app.post('/api/user/login', loginController.loginUser); 
};
