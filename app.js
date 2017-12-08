const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');
const errorhandler = require('errorhandler');
const passport = require('passport');
const passportConfig = require('./server/config/local');
const session = require('express-session'); 

const db = require('./server/models/index');

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (http://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Parse cookies as well
app.use(cookieParser());

// Need sessions to persist state of user
app.use(session({
	secret: '7rKZvk4vxjPG7uNny8JC',
	resave: false,
	saveUninitialized: true
}));

app.use(function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "http://localhost"); 

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	res.setHeader("Access-Control-Allow-Headers",  "Origin, X-Requested-With, Content-Type, Accept");

	// Set to true if you need the website to include cookies in the requests sent
 	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	next();
});

// Initialize passport for use
app.use(passport.initialize());
app.use(passport.session());

// environment specific functions
if (process.env.NODE_ENV === 'development') {
	app.use(errorhandler());
}

// Setup a default catch-all route that sends back a welcome message in JSON format.
require('./server/routes')(app);
app.get('*', (req, res) => res.status(200).send({
	message: 'Welcome to the beginning of nothingness.',
}));
app.post('*', (req, res) => res.status(400).send({
	message: 'I think you found a black hole. Good for you. Tell NASA.',
}));

module.exports = app;
