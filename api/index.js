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

	//update CRM address
	app.post('/updateCrmAddress/:cust_id/:email/:address_type', function(req, res) {
		console.log('CRM Address POST request from cust_id: ' + req.params.cust_id + ' cust_email: ' + req.params.email + ' address_type: ' + req.params.address_type);
		var payload = new Object();
		if (req.params.address_type == 'Billing') {
			payload.billing_address = req.body;
		} else if (req.params.address_type == 'Mailing') {
			payload.mailing_address = req.body;
		}
		var http = require("http");
		var options = {
			host: 'wow-crm-plus-1.mybluemix.net',
			path: '/sync?cust_id=' + req.params.cust_id + '&cust_email=' + req.params.email + '&address_type=' + req.params.address_type,
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			}
		};
		var crm_req = http.request(options, function (res) {
			var responseString = "";
			res.on("data", function (data) {
				responseString += data;
			});
			res.on("end", function () {
				console.log(responseString); 
			});
		});
		crm_req.write(JSON.stringify(payload, null, ' '));
		crm_req.end();
		res.send(req.body);
	});

	//get CRM address
	app.get('/getCrmAddress/:cust_id/:email', function(req, res) {
		console.log('CRM Address GET request from cust_id: ' + req.params.cust_id + ' cust_email: ' + req.params.email);
		var http = require("http");
		var options = {
			host: 'wow-crm-plus-1.mybluemix.net',
			path: '/profile?cust_id=' + req.params.cust_id + '&cust_email=' + req.params.email,
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		};
		var crm_req = http.request(options, function (crm_res) {
			var responseString = "";
			crm_res.on("data", function (data) {
				responseString += data;
			});
			crm_res.on("end", function () {
				console.log(responseString);
				res.send(responseString);
			});
		});
		crm_req.end();
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
