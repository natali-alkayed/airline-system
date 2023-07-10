'use strict';
require('dotenv').config();
const port = process.env.PORT || 3080;
const socket = require('socket.io');
const ioServer = socket(port);
const AirLineConnection = ioServer.of('/airline');
const moment = require('moment');
const uuid = require('uuid').v4;

const queue = {
  flights: {

  }
};

ioServer.on('connection', (socket) => {
  console.log('connected ', socket.id);

  function printFlightDetails(event, flightDetails) {
    const formattedTime = moment().format('YYYY-MM-DD HH:mm:ss');
    console.log(`Flight {
      id: '${id},
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
  const id = uuid();
  socket.on('new-flight', (flightDetails) => {
   // const id = uuid();
    flightDetails.id = id;
    queue.flights[id] = flightDetails;
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
  socket.on('get-all', () => {
    const flights = Object.values(queue.flights);
    socket.emit('flight', flights);
    queue.flights = {};
    console.log("*****************************",queue.flights);
  });
  
  socket.on('delete', (id) => {
    delete queue.flights[id];
    console.log("queue v2 after arrived and delete specific id ",queue);
  });

})








