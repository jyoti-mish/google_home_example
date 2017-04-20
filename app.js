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
    assistant.tell('Hello, World1!');
    getJsonEventsFromWikipedia(setpoint, temp, function (events) {
        var speechText = "";
        sessionAttributes.text = events;
        session.attributes = sessionAttributes;
        if (events.length == 0) {
         //   speechText = "There is a problem connecting to Aprilaire at this time. Please try again later.";
         //   response.tell(speechText);
        } else {
            
                speechText = speechText+ " "+ events + " ";
         
          //  speechText = speechText + " Wanna go deeper in history?";
            response.askWithCard(prefixContent + speechText, repromptText, cardTitle, speechText);
        }
    });
  }
function getJsonEventsFromWikipedia(setpoint, temp, eventCallback) {
	
 var jsonobj=JSON.stringify({"LocationId":5919,"Parameters":[{"ParameterName":"Hold Type","ParameterValue":"1"},{"ParameterName":"Hold Fan","ParameterValue":"2"},{"ParameterName":"Hold Heat Setpoint","ParameterValue":temp.value},{"ParameterName":"Hold Cool Setpoint","ParameterValue":"87"},{"ParameterName":"Hold End Minute","ParameterValue":"0"},{"ParameterName":"Hold End Hour","ParameterValue":"6"},{"ParameterName":"Hold End Date","ParameterValue":"29"},{"ParameterName":"Hold End Month","ParameterValue":"8"},{"ParameterName":"Hold End Year","ParameterValue":"16"},{"ParameterName":"Hold Dehumidification Setpoint","ParameterValue":"0"}],"ThermostatId":75503,"UserId":4,"AttributeName":"Hold"});
//var jsonobj=JSON.stringify({"LocationId":5919,"Parameters":[{"ParameterName":"Hold Type","ParameterValue":"1"},{"ParameterName":"Hold Fan","ParameterValue":"2"},{"ParameterName":"Hold Heat Setpoint","ParameterValue":"84"},{"ParameterName":"Hold Cool Setpoint","ParameterValue":"87"},{"ParameterName":"Hold End Minute","ParameterValue":"0"},{"ParameterName":"Hold End Hour","ParameterValue":"6"},{"ParameterName":"Hold End Date","ParameterValue":"29"},{"ParameterName":"Hold End Month","ParameterValue":"8"},{"ParameterName":"Hold End Year","ParameterValue":"16"},{"ParameterName":"Hold Dehumidification Setpoint","ParameterValue":"0"}],"ThermostatId":75503,"UserId":4,"AttributeName":"Hold"});
var post_options = {
      host: 'web.lntdemoprojects.com',
      port: '443',
      path: '/raswcfservice/RASWCFService.svc/SetThermostatParameters/0',
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Content-Length': jsonobj.length
      }
  };
var callback=function(res) {
        var body = '';
res.setEncoding('utf8');
        res.on('data', function (chunk) {
            body += chunk;
        });

        res.on('end', function () {
			if(body=="{\"Message\":\"Settings saved successfully!\",\"Result\":true}")
				{
            var stringResult = "temperature is changed.";
            eventCallback(stringResult);
				}
        });
    }
	
    https.request(post_options, callback).write(jsonobj);
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
