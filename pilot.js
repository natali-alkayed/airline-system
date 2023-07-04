const EventEmitter = require('events');
const moment = require('moment');
const eventEmitter = new EventEmitter();

function keepPilotAlerted() {
  eventEmitter.on('new-flight', (flightDetails) => {
    setTimeout(() => {
      eventEmitter.emit('took-off', flightDetails);
      const formattedTime = moment().format('YYYY-MM-DD HH:mm:ss');
      console.log(`Flight ${flightDetails.flightId} has taken off.`);
      console.log(`Flight {
          event: 'new-flight',
          time: ${formattedTime},
          Details: {
            airLine: 'Royal Jordanian Airlines',
            flightID: '${flightDetails.flightId}',
            pilot: '${flightDetails.pilotName}',
            destination: '${flightDetails.destination}'
          }
        }`);
        console.log("***********************************");
    }, 4000);
    setTimeout(() => {
      eventEmitter.emit('Arrived', flightDetails);
      const formattedTime = moment().format('YYYY-MM-DD HH:mm:ss');
    console.log(`Pilot: Flight ${flightDetails.flightId} has arrived.`);
    console.log(`Flight {
        event: 'new-flight',
        time: ${formattedTime},
        Details: {
          airLine: 'Royal Jordanian Airlines',
          flightID: '${flightDetails.flightId}',
          pilot: '${flightDetails.pilotName}',
          destination: '${flightDetails.destination}'
        }
      }`);
      console.log("***********************************");
      console.log(`Manager: we're greatly thankful for the amazing flight, ${flightDetails.pilotName}`);
    }, 7000);
  });
}

module.exports = {
  eventEmitter,
  keepPilotAlerted
};
