const baseApi = require('./base');
const organizationsApi = require('./organizations'); 
const userApi = require('./user');
const stagesApi = require('./stages'); 

module.exports = (app) => {
	baseApi(app),
	organizationsApi(app), 
	stagesApi(app),
	userApi(app)
};
