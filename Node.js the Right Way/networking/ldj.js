'use strict';

const events = require('events'),
  util = require('util'),
  // client constructor
  LDJClient = function(stream) {
    events.EventEmitter.call(this);
    // const self = this;
    let buffer = '';
    stream.on('data', data => {
      buffer += data;
      let boundary = buffer.indexOf('\n');
      while (boundary !== -1) {
        const input = buffer.substr(0, boundary);
        buffer = buffer.substr(boundary + 1);
        this.emit('message', JSON.parse(input));
        boundary = buffer.indexOf('\n');
      }
    });
  };

util.inherits(LDJClient, events.EventEmitter);

// export module methods
exports.LDJClient = LDJClient;
exports.connect = stream => new LDJClient(stream);
