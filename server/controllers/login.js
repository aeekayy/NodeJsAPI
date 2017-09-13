const Session = require('../models').Session;
const UserType = require('../models').UserType; 

module.exports = {
	login(req, res) {
		return Session
			.findOne( { where: {username: req.params.username } })
			.then( session => {
				if(!session) {
				return res.status(401).send({
					message: 'User Session Not Found',
				});
			}
			return res.status(200).send(session); 
			})
			.catch(error => res.status(400).send(error));
			
		},
};
