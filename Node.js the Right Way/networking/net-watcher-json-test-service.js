'use strict';

const port = 3000,
  net = require('net'),
  server = net.createServer(connection => {
    console.log('Subscriber connected');

    // send the first chunk inmediately
    connection.write('{"type":"changed","file":"targ');

    // after a one second delay, send the other chunk
    let timer = setTimeout(() => {
      connection.write('et.txt","timestamp": 1556683521891}' + '\n');
      connection.end();
    }, 1000);

    // clear timer when the connection ends
    connection.on('end', () => {
      clearTimeout(timer);
      console.log('Subscriber disconnected');
    });
  });

server.listen(port, () => {
  console.log('Test server listening for subscribers...');
});
