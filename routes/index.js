const baseApi = require('./base');
const organizationsApi = require('./organizations'); 
const userApi = require('./user');
const stagesApi = require('./stages'); 
const imagesApi = require('./images');
const bookingsApi = require('./bookings'); 

module.exports = (app) => {
	baseApi(app),
	organizationsApi(app), 
	stagesApi(app),
	userApi(app),
	imagesApi(app),
	bookingsApi(app)
};
