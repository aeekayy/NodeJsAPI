exports.authenticated = function(req, res, next) {
	if(req.isAuthenticated()) {
		next();
	} else {
		res.redirect('/api/v1/login');
	}
};

exports.destroySession = function(req, res, next) {
	req.logOut(); 
	req.session.destroy(); 
	res.redirect('/'); 
}
