'use strict';
require('dotenv').config();
const port = process.env.PORT || 3080;
const io = require('socket.io-client');
let host = `http://localhost:${port}/`;
const SystemConnection = io.connect(host);
const casual = require('casual');
const { v4: uuidv4 } = require('uuid');


function scheduleNewFlight() {
  const flightId = uuidv4();
  const pilotName = casual.name;
  const destination = casual.city;
  SystemConnection.emit('new-flight', { flightId, pilotName, destination });

}

function handleNewFlight(flightDetails) {
  console.log(`Manager: new flight with ID '${flightDetails.flightId}' has been scheduled`);
  console.log("-------------------------------------");
}



setInterval(scheduleNewFlight, 10000);
SystemConnection.on('new-flight', handleNewFlight);









