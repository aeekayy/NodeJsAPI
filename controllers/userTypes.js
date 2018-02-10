const Session = require('../models').Session;
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
	retrieve(req, res) {
		return UserType
			.findById(req.params.userTypeId, {})
			.then( userType => {
				if(!userType) {
				return res.status(404).send({
					message: 'User Type Not Found',
				});
			}
			return res.status(200).send(userType);
			})
			.catch(error => res.status(400).send(error));
		},
	listAll(req, res) {
		return UserType
			.all()
			.then(userTypes => res.status(200).send(userTypes))
			.catch(error => res.status(400).send(error));
		},
};
