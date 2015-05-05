'use strict';

function TCPReceiver(handle) {
  return function (c) {
    c.on('data', function (data) {
      handle(data.toString(), function (err, result) {
        c.write(result);
      });
    });
  };
}

module.exports = TCPReceiver;