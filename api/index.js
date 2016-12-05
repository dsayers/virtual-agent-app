module.exports = function(app, io) {
	var db = require('../lib/cloudant');
	var request = require('request');
	var socket;
	var keyword = process.env.KEYWORD;
	io.on("connection", function(s) {
    console.log('Connected');
    socket = s;
  });

	//Get record
	app.get('/record/:id', function(req, res) {
		db.getRecord(req.params.id, function(data) {
			res.send(data);
		})
	});

	//Get message from an agent
	app.post('/agent/:id', function(req, res) {
		var message = {text: req.body.text, attachments:[]}
		if (req.body.data) {
			for (var i in req.body.data) {
				var mes = req.body.data[i];
				if (mes.message && mes.message.length>0) {
					var color = (mes.author === 'Bot') ? '#9c27b0' :'#428ff4';
					message.attachments.push(
						{
							"fallback": req.body.text,
							"color": color,
	            "author_name": mes.author,
	            "text": mes.message
						}
					);
				}
			}
		}
		postToSlack(message);
		res.send('Done');
	});

	//Update a record
	app.post('/updateRecord/:id', function(req, res) {
		console.log('Update record request from id: ' + req.params.id);
		db.updateRecord(req.params.id, req.body, function(data) {
			res.send(data);
		})
	});

	//Post a record
	app.post('/postRecord/:id', function(req, res) {
		db.postRecord(req.params.id, req.body, function(data) {
			res.send(data);
		})
	});

	//Post message to Slack
	app.post('/slack', function(req, res) {
		console.log('Message from slack!');
		if (req.body.token === process.env.SLACK_OUTGOING_TOKEN && req.body.user_name !== 'slackbot') {
				if (req.body.text === keyword) {
					socket.compress(false).emit('slackMessage', {text: '!Q@W#E$R'});
				} else {
					socket.compress(false).emit('slackMessage', req.body);
				}
		}
	});

	function postToSlack(message) {
		// Set the headers
		var headers = {
			'Content-Type': 'application/json'
		}
		// Configure the request
		var options = {
			url: process.env.SLACK_INCOMING_WEBHOOK,
			method: 'POST',
			headers: headers,
			json: message
		}
		// Start the request
		request(options, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				// Success
			}
		})
	}
}
