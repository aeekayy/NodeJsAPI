var config = {};

config.version = 'v1'; 
config.img_loc = 'images.stagehunters.com'; 

config.node_geocoder_options = {
	provider: 'google',
	httpAdapter: 'https',
//	apiKey: 'AIzaSyCmDjY5HsA8QxL38FaEdjNcJ6C_AYQnGvE',
	apiKey: 'AIzaSyAHSnUStt7wDC4P9vmQXyVMdrrb5kwnpM4',
	formatter: null
};

config.errors = {
	'401': "Unauthorized access. Please login with the appropriate credentials.",
	'default': "An error occurred. That's all I can tell you.",
	'object_not_found': "Unable to find the object that you're looking for.",
	'session_not_found': "Unable to find the session. Please log in.",
	'user_type_exists': "The user type exists already."
};

module.exports = config; 
