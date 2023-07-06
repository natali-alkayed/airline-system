// const EventEmitter = require('events');
// const moment = require('moment');
// const eventEmitter = new EventEmitter();

// function keepPilotAlerted() {
//   eventEmitter.on('new-flight', (flightDetails) => {
//     setTimeout(() => {
//       eventEmitter.emit('took-off', flightDetails);
//       const formattedTime = moment().format('YYYY-MM-DD HH:mm:ss');
//       console.log(`Flight ${flightDetails.flightId} has taken off.`);
//       console.log(`Flight {
//           event: 'new-flight',
//           time: ${formattedTime},
//           Details: {
//             airLine: 'Royal Jordanian Airlines',
//             flightID: '${flightDetails.flightId}',
//             pilot: '${flightDetails.pilotName}',
//             destination: '${flightDetails.destination}'
//           }
//         }`);
//         console.log("***********************************");
//     }, 4000);
//     setTimeout(() => {
//       eventEmitter.emit('Arrived', flightDetails);
//       const formattedTime = moment().format('YYYY-MM-DD HH:mm:ss');
//     console.log(`Pilot: Flight ${flightDetails.flightId} has arrived.`);
//     console.log(`Flight {
//         event: 'new-flight',
//         time: ${formattedTime},
//         Details: {
//           airLine: 'Royal Jordanian Airlines',
//           flightID: '${flightDetails.flightId}',
//           pilot: '${flightDetails.pilotName}',
//           destination: '${flightDetails.destination}'
//         }
//       }`);
//       console.log("***********************************");
//       console.log(`Manager: we're greatly thankful for the amazing flight, ${flightDetails.pilotName}`);
//     }, 7000);
//   });
// }

// module.exports = {
//   eventEmitter,
//   keepPilotAlerted
// };
/////////////////////////////////////////////////////////////////////////////////////////////////
'use strict';
require('dotenv').config();
const port = process.env.PORT || 3070;
const io = require('socket.io-client');
let host = `http://localhost:${port}/airline`;
const AirLineConnection = io.connect(host);
let host2 = `http://localhost:${port}/`;
const SystemConnection = io.connect(host2);
const moment = require('moment');
require('../Manager/manager');
// AirLineConnection.on('took-off', (flightDetails) => {
//   setTimeout(() => {
//     console.log(`Flight ${flightDetails.flightId} has taken off.`);
//     console.log("-------------------------------------");
//     const formattedTime = moment().format('YYYY-MM-DD HH:mm:ss');
//     console.log(`Flight {
//       event: 'Arrived',
//       time: ${formattedTime},
//       Details: {
//         airLine: 'Royal Jordanian Airlines',
//         destination: '${flightDetails.destination}',
//         pilot: '${flightDetails.pilotName}',
//         flightID: '${flightDetails.flightId}'
//       }
//     }`)
//   }, 4000);
// });

function keepPilotAlerted() {
    SystemConnection.on('new-flight', (flightDetails) => {
       // AirLineConnection.emit('took-off', flightDetails);
       AirLineConnection.on('took-off', (flightDetails) => {
        setTimeout(() => {
          console.log(`Flight ${flightDetails.flightId} has taken off.`);
          console.log("-------------------------------------");
          const formattedTime = moment().format('YYYY-MM-DD HH:mm:ss');
          console.log(`Flight {
            event: 'Arrived',
            time: ${formattedTime},
            Details: {
              airLine: 'Royal Jordanian Airlines',
              destination: '${flightDetails.destination}',
              pilot: '${flightDetails.pilotName}',
              flightID: '${flightDetails.flightId}'
            }
          }`)
        }, 4000);});
      setTimeout(() => {
        SystemConnection.on('Arrived', flightDetails);
            console.log(`Pilot: Flight ${flightDetails.flightId} has arrived.`);
              console.log("-------------------------------------");
              const formattedTime = moment().format('YYYY-MM-DD HH:mm:ss');
            console.log(`Flight {
              event: 'Arrived',
              time: ${formattedTime},
              Details: {
                airLine: 'Royal Jordanian Airlines',
                destination: '${flightDetails.destination}',
                pilot: '${flightDetails.pilotName}',
                flightID: '${flightDetails.flightId}'
              }
            }`);
            }, 7000);
            
          });}


module.exports = {keepPilotAlerted};

