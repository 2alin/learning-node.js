'use strict';

const fs = require('fs'),
  port = 3000,
  net = require('net'),
  filename = process.argv[2],
  server = net.createServer(connection => {
    // reporting
    console.log('Subscriber connected.');
    // connection.write(`Now watching ${filename} for changes...\n`);
    connection.write(
      JSON.stringify({
        type: 'watching',
        file: filename,
      }) + '\n'
    );

    // watcher setup
    let watcher = fs.watch(filename, () => {
      // connection.write(`File ${filename} changed: ${new Date().toString()}\n`);
      connection.write(
        JSON.stringify({
          type: 'changed',
          file: filename,
          timestamp: Date.now(),
        }) + '\n'
      );
    });

    // cleanup
    connection.on('close', () => {
      console.log('Subscriber disconnected.');
      watcher.close();
    });
  });

if (!filename) {
  throw Error('No target filename was specified.');
}

server.listen(port, () => {
  console.log(`Listening for subscribers on port ${port}...`);
});
