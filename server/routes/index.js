const baseApi = require('./base');
const userApi = require('./user');
const stagesApi = require('./stages'); 

module.exports = (app) => {
	baseApi(app),
	stagesApi(app),
	userApi(app)
};
