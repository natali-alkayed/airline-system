const { eventEmitter } = require('./pilot');
const moment = require('moment');


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

eventEmitter.on('took-off', (flightDetails) => {
  printFlightDetails('took_off', flightDetails);
});

eventEmitter.on('Arrived', (flightDetails) => {
  printFlightDetails('Arrived', flightDetails);
});
