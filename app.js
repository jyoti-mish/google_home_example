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

// [START YourAction]
app.post('/', function (req, res) {
  const assistant = new Assistant({request: req, response: res});
  console.log('Request headers: ' + JSON.stringify(req.headers));
  console.log('Request body: ' + JSON.stringify(req.body));

  // Fulfill action business logic
  function responseHandler (assistant) {
    // Complete your fulfillment logic and send a response
    
   getJsonEvents( function (events) {
	   assistant.tell('Hello, World1!');
     var prefixContent =""
	 
	   var speechText = "";
        if (events.length == 0) {
            speechText = "There is a problem connecting to thermostat at this time. Please try again later.";
             assistant.tell(speechText);
        } else {
            for (i = 0; i < 1; i++) {
                speechText = speechText + events[i] + " ";
            }
           // speechText = speechText + " Wanna go deeper in history?";
             assistant.tell(prefixContent + speechText);
        }
    });
  }
function getJsonEvents(eventCallback) {
   var url = 'https://web.lntdemoprojects.com/RASWCFService/RASWCFService.svc/GetThermostatHome/6402/5967/76632';
var https = require('https');
    https.get(url, function(res) {
        var body = '';

        res.on('data', function (chunk) {
            body += chunk;
        });

        res.on('end', function () {
            var stringResult = body;
            eventCallback(stringResult);
        });
    }).on('error', function (e) {
        console.log("Got error: ", e);
    });
}
  assistant.handleRequest(responseHandler);
});
// [END YourAction]

if (module === require.main) {
  // [START server]
  // Start the server
  let server = app.listen(process.env.PORT || 8080, function () {
    let port = server.address().port;
    console.log('App listening on port %s', port);
  });
  // [END server]
}

module.exports = app;
