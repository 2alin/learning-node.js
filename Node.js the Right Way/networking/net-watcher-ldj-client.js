'use strict';

const port = 3000,
  net = require('net'),
  ldj = require('./ldj.js'),
  netClient = net.connect({ port }),
  ldjClient = ldj.connect(netClient);

ldjClient.on('message', message => {
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

ldjClient.on('print', string => {
  console.log(string);
});
