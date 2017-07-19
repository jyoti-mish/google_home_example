// Copyright 2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

process.env.DEBUG = 'actions-on-google:*';
let Assistant = require('actions-on-google').ApiAiAssistant;
let express = require('express');
let bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.json({type: 'application/json'}));

const Temp_ACTION = 'SettempIntent';
const status_ACTION = 'SetStatusIntent';
const SETPOINT_ARGUMENT = 'SetPoint';
const NUMBER_ARGUMENT = 'Temp';

// [START YourAction]
app.post('/', function (req, res) {
  
  assistant.tell('Alright, your silly name is ');
  // [END server]
}

module.exports = app;
