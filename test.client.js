'use strict';

var port = 8124;

var spec = require('./service.spec.js');
var tcpTransmitter = require('./lib/tcpClient')({ host: 'localhost', port: port });
var rpcClient = require('./lib/rpcClient')(spec, tcpTransmitter);

// Success
rpcClient.Greeter.sayHello({ name: 'Nouman' }, function () {
  console.log(arguments);
});

// Error
rpcClient.Greeter.sayHello({ a: 123 }, function () {
  console.log(arguments);
});

// Calc methods has dynamic arguments length
rpcClient.Calc.add(1, 2, 3, function () {
  console.log(arguments);
});

rpcClient.Calc.multiply(20, 1, function () {
  console.log(arguments);
});