// //Royal Jordanian Airlines
// const EventEmitter = require('events');
// //const faker = require('faker');
// const casual = require('casual');
// const { v4: uuidv4 } = require('uuid');
// const pilotModule = require('./pilot');
// const moment = require('moment');

// const { eventEmitter, keepPilotAlerted } = pilotModule;
// const mainEventEmitter = new EventEmitter();
// const formattedTime = moment().format('YYYY-MM-DD HH:mm:ss');


// function scheduleNewFlight() {
//     const flightId = uuidv4();
//     const pilotName = casual.name;
//     const destination = casual.city;

//     console.log(`A new flight with ID ${flightId} has been scheduled.`);
//     eventEmitter.emit('new-flight', { flightId, pilotName, destination });
// }

// function handleNewFlight(flightDetails) {
//     const formattedTime = moment().format('YYYY-MM-DD HH:mm:ss');
//     console.log(`Manager: new flight with ID '${flightDetails.flightId}' has been scheduled`);
//     console.log(`Flight {
//       event: 'new-flight',
//       time: ${formattedTime},
//       Details: {
//         airLine: 'Royal Jordanian Airlines',
//         flightID: '${flightDetails.flightId}',
//         pilot: '${flightDetails.pilotName}',
//         destination: '${flightDetails.destination}'
//       }
//     }`);
//     console.log("***********************************");
//   }

// function handleTookOff(flightDetails) {
//     console.log(`Flight ${flightDetails.flightId} has taken off.`);
// }

// function handleArrived(flightDetails) {
//     console.log(`Pilot: Flight ${flightDetails.flightId} has arrived.`);
// }



// eventEmitter.on('new-flight', handleNewFlight);
// mainEventEmitter.on('took-off', handleTookOff);
// mainEventEmitter.on('Arrived', handleArrived);
// setInterval(scheduleNewFlight, 10000);
// keepPilotAlerted();

//////////////////////////////////////////////////////////////////////////////////////////////////////////
'use strict';
require('dotenv').config();
const port = process.env.PORT || 3070;
const io = require('socket.io-client');
let host = `http://localhost:${port}/`;
const SystemConnection = io.connect(host);
const casual = require('casual');
const { v4: uuidv4 } = require('uuid');
const pilotModule = require('../Pilot/pilot');
const moment = require('moment');
//require('../Pilot/pilot');

setInterval(scheduleNewFlight, 10000);
SystemConnection.on('new-flight', handleNewFlight);


const {keepPilotAlerted } = pilotModule;
function scheduleNewFlight() {
  const flightId = uuidv4();
  const pilotName = casual.name;
  const destination = casual.city;
  SystemConnection.emit('new-flight', { flightId, pilotName, destination });
}

function handleNewFlight(flightDetails) {
  console.log(`Manager: new flight with ID '${flightDetails.flightId}' has been scheduled`);
  console.log("-------------------------------------");
  const formattedTime = moment().format('YYYY-MM-DD HH:mm:ss');
  console.log(`Flight {
    event: 'new-flight',
    time: ${formattedTime},
    Details: {
      airLine: 'Royal Jordanian Airlines',
      destination: '${flightDetails.destination}',
      pilot: '${flightDetails.pilotName}',
      flightID: '${flightDetails.flightId}'
    }
  }`);
}

function handleArrived(flightDetails) {
  console.log(`Pilot: Flight ${flightDetails.flightId} has arrived.`);
}

SystemConnection.emit('Arrived', handleArrived);

keepPilotAlerted();







