'use strict';
require('dotenv').config();
const port = process.env.PORT || 3080;
const socket = require('socket.io');
const ioServer = socket(port);
const AirLineConnection = ioServer.of('/airline');
const moment = require('moment');


ioServer.on('connection', (socket) => {
  console.log('connected ', socket.id);

function printFlightDetails(event, flightDetails) {
    const formattedTime = moment().format('YYYY-MM-DD HH:mm:ss');
    console.log(`Flight {
      event: '${event}',
      time: ${formattedTime},
      Details: {
        airLine: 'Royal Jordanian Airlines',
        destination: '${flightDetails.destination}',
        pilot: '${flightDetails.pilotName}',
        flightID: '${flightDetails.flightId}'
      }
    }`);
  }

  socket.on('new-flight', (flightDetails) => {
  printFlightDetails('new-flight', flightDetails);
  socket.emit('new-flight', flightDetails);

  setTimeout(() => {
    AirLineConnection.emit('took-off', flightDetails);
    printFlightDetails('took_off', flightDetails);
    AirLineConnection.emit('took-off-log', flightDetails.flightId);
  }, 4000);
 
  setTimeout(() => {
    socket.emit('Arrived', flightDetails);
    printFlightDetails('Arrived', flightDetails);
    AirLineConnection.emit('arrived-log', flightDetails.flightId);
  }, 7000);
 
});

})




