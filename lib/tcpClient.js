'use strict';

var net = require('net');

function tcpClient(con) {
  return function (msg, cb) {
    var client = net.connect(con, function () {
      client.write(JSON.stringify(msg));
    });

    client.on('data', function(data) {
      var res = JSON.parse(data.toString());
      cb(res);
      client.end();
    });
  };
}

module.exports = tcpClient;