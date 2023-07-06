'use strict';
require('dotenv').config();
const port = process.env.PORT || 3080;
const io = require('socket.io-client');
let host = `http://localhost:${port}/airline`;
const AirLineConnection = io.connect(host);
let host2 = `http://localhost:${port}/`;
const SystemConnection = io.connect(host2);


 
  AirLineConnection.on('took-off-log', (flightId) => {
        console.log(`Pilot: Flight with ID '${flightId}' took off.`);
        console.log("-------------------------------------");})
   

    
    AirLineConnection.on('arrived-log', (flightId) => {
        console.log(`Pilot: Flight with ID '${flightId}' arrived.`);
        console.log("-------------------------------------");})
      



