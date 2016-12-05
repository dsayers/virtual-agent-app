/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/*eslint-env node*/
var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
require('dotenv').load();
// Creates a new express server
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Serves the files out of ./public as our main files
app.use(express.static(__dirname + '/public'))
  // cfenv provides access to your Cloud Foundry environment
var cfenv = require('cfenv');
// Gets the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();
// Starts server on the specified port and binding host
var server = http.listen(appEnv.port, function() {
  console.log("server starting on " + appEnv.url);
});
require('./api/index')(app, io);
