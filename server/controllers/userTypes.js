const UserType = require('../models').UserType; 

module.exports = {
	create(req, res) {
		return UserType
			.create({
				typename: req.body.typename,
				description: req.body.description,	
			})
			.then(userType => res.status(201).send(userType))
			.catch(error => res.status(400).send(error));
		},
};
