'use strict';

var port = 8124;

var net = require('net');
var spec = require('./service.spec.js');
var tcpReceiver = require('./lib/tcpReceiver');
var rpcServer = require('./lib/rpcServer')(spec);

rpcServer.register('Greeter', require('./greeter'));
rpcServer.register('Calc', require('./calc'));

net
  .createServer(tcpReceiver(rpcServer.handle))
  .listen(port);