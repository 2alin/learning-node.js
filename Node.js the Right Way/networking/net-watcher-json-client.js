'use strict';

const port = 3000,
  net = require('net'),
  client = net.connect({ port });

client.on('data', data => {
  const message = JSON.parse(data);
  switch (message.type) {
    case 'watching':
      console.log(`Now watching: ${message.file}`);
      break;
    case 'changed':
      const date = new Date(message.timestamp);
      console.log(`File ${message.file} changed at ${date}`);
      break;
    default:
      throw Error(`Unrecognized message type: ${message.type}`);
  }
});
