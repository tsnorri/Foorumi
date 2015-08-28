var authentication = function(req, res, next) {
	// Tarkista, että käyttäjä on kirjautunut tässä
	if (!req.session.userId)
		res.send(403);
	else
		next();
}

module.exports = authentication;
