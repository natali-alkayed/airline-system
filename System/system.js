// const { eventEmitter } = require('./pilot');
// const moment = require('moment');


// function printFlightDetails(event, flightDetails) {
//   const formattedTime = moment().format('YYYY-MM-DD HH:mm:ss');

//   console.log(`Flight {
//     event: '${event}',
//     time: ${formattedTime},
//     Details: {
//       airLine: 'Royal Jordanian Airlines',
//       destination: '${flightDetails.destination}',
//       pilot: '${flightDetails.pilotName}',
//       flightID: '${flightDetails.flightId}'
//     }
//   }`);
// }

// eventEmitter.on('took-off', (flightDetails) => {
//   printFlightDetails('took_off', flightDetails);
// });

// eventEmitter.on('Arrived', (flightDetails) => {
//   printFlightDetails('Arrived', flightDetails);
// });
// /////////////////////////////////////////////////////////////////////////////////////////////
'use strict';
require('dotenv').config();
const port = process.env.PORT || 3070;
const socket = require('socket.io');
const ioServer = socket(port);
const AirLineConnection = ioServer.of('/airline');
const moment = require('moment');
require('../Manager/manager');
require('../Pilot/pilot');

ioServer.on('connection', (socket) => {
  console.log('connected ', socket.id);
  socket.on('new-flight', () => {
  socket.emit('new-flight', (flightDetails))
  });
});

ioServer.on('connection', (socket) => {
  console.log('connected ', socket.id);
  socket.on('Arrived', () => {
  socket.emit('Arrived', (flightDetails))
  });
});


AirLineConnection.on('connection', (socket) => {
  console.log('connected to airline system ', socket.id);
  AirLineConnection.emit('took-off', (flightDetails));
});



 

