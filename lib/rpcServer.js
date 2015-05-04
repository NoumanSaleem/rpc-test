'use strict';

var _ = require('lodash');
var async = require('async');
var util = require('util');

function RPCServer(spec) {
  var registry = {};

  function register(key, val) {
    if ('object' === typeof val) {
      Object.keys(val).forEach(function (subKey) {
        register(util.format('%s.%s', key, subKey), val[subKey]);
      });
    }

    if (!_.get(spec, key)) throw new Error(util.format('%s is not a valid path', key));

    _.set(registry, key, val);
  }

  function handle(data, cb) {
    var msg;

    try {
      msg = JSON.parse(data);
    } catch (e) {}

    var tasks = Array.isArray(msg) ? msg : [msg];

    async.map(tasks, function (msg, cb) {
      var fn = _.get(registry, msg.method);
      var args = msg.params;

      if (!Array.isArray(args)) args = [args];

      args.push(cb);

      fn.apply({}, args);
    }, function (err, results) {
      cb(null, JSON.stringify(Array.isArray(msg) ? results : results[0]));
    });
  }

  return {
    register: register,
    handle: handle
  };
}

module.exports = RPCServer;