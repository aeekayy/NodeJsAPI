const baseApi = require('./base');
const userApi = require('./user');

module.exports = (app) => {
	baseApi(app),
	userApi(app)
};
