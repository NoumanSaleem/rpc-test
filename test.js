'use strict';

var port = 8124;

var net = require('net');
var spec = require('./service.json');

var tcpTransmitter = require('./lib/tcpClient')({ host: 'localhost', port: port });
var tcpReceiver = require('./lib/tcpConverter');

var rpcClient = require('./lib/rpcClient')(spec, tcpTransmitter);
var rpcServer = require('./lib/rpcServer')(spec);

rpcServer.register('Greeter', {
  sayHello: function (obj, cb) {
    cb(null, 'Hello, ' + obj.name);
  }
});

net
  .createServer(tcpReceiver(rpcServer.handle))
  .listen(port);

rpcClient.Greeter.sayHello({ name: 'Nouman' }, function () {
  console.log(arguments);
});

rpcClient.Greeter.sayHello({ name: 123 }, function () {
  console.log(arguments);
});