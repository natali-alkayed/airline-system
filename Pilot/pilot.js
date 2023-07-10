'use strict';
require('dotenv').config();
const port = process.env.PORT || 3080;
const io = require('socket.io-client');
let host = `http://localhost:${port}/airline`;
const AirLineConnection = io.connect(host);
let host2 = `http://localhost:${port}/`;
const SystemConnection = io.connect(host2);

SystemConnection.emit('get-all');


  AirLineConnection.on('took-off-log', (flightId) => {
        console.log(`Pilot: Flight with ID '${flightId}' took off.`);
        console.log("-------------------------------------");})
   

    AirLineConnection.on('arrived-log', (flightId) => {
        console.log(`Pilot: Flight with ID '${flightId}' arrived.`);
        console.log("-------------------------------------");
        SystemConnection.emit('flight-arrived', flightId);
        SystemConnection.emit('delete', (flightId));
      })
///////////////////////////////////////////////////////////////////////////

SystemConnection.on('flight', (flights) => {
  
  if (flights.length === 0) {
    console.log("Pilot: Sorry, I didn't catch any flight IDs.");
  
  } else {
    console.log("Pilot: Sorry, I didn't catch these flight IDs:", flights.map(flight => flight.flightId).join(', '));
  }

  if (flights.flightId !== '332u443673r32yuf463') {
    setInterval(() => {
      console.log("Pilot: Sorry, I didn't catch this flight ID:332u443673r32yuf463");
    }, 200000); 
  }
  
});





