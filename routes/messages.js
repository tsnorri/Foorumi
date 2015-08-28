var express = require('express');
var router = express.Router();

var authentication = require('../utils/authentication');
var Models = require('../models');

// Huom! Kaikki polut alkavat polulla /messages

// GET /messages/:id
router.get('/:id', function(req, res, next) {
	// Hae viesti tällä id:llä ja siihen liittyvät vastaukset tässä (Vinkki: findOne ja sopiva include)
	var messageId = req.params.id;
	Models.Message.findOne({
		where: { id: messageId },
		include: [
			{
				model: Models.User
			},
			{
				model: Models.Reply,
				include: { model: Models.User }
			}
		]
	}).then(function(message) { res.json(message); });
});

// POST /messages/:id/reply
router.post('/:id/reply', function(req, res, next) {
	var loggedInId = req.session.userId ? req.session.userId : null;
	if (!loggedInId)
		res.send(403);
	else
	{
		// Lisää tällä id:llä varustettuun viestiin...
		var messageId = req.params.id;
		// ...tämä vastaus (Vinkki: lisää ensin replyToAdd-objektiin kenttä MessageId, jonka arvo on messageId-muuttujan arvo ja käytä sen jälkeen create-funktiota)
		var replyToAdd = req.body;
		replyToAdd.MessageId = messageId;
		replyToAdd.UserId = req.session.userId;

		// Palauta vastauksena lisätty vastaus
		// Passing { include: [{ model: Models.User }]} doesn't help her so using findOne.
		Models.Reply.create(replyToAdd).then(function(reply) {
			Models.Reply.findOne({
				where: { id: reply.id },
				include: { model: Models.User }
			}).then(function(reply) { res.json(reply); });
		});
	}
});

module.exports = router;
