'use strict';

var _ = require('lodash');
var format = require('util').format;
var validator = require('is-my-json-valid');

function RPCClient(spec, transmit) {
  return Object.keys(spec).reduce(function (services, serviceName) {
    services[serviceName] = Object.keys(spec[serviceName]).reduce(function (service, method) {
      service[method] = function () {
        var params = Array.prototype.slice.call(arguments);
        var cb = params.pop();

        if (1 === params.length) params = params.shift();

        var key = format('%s.%s', serviceName, method);
        var validate = validator(_.get(spec, format('%s.%s', key, 'parameters')));
        var valid = validate(params);

        if (!valid) return cb(validate.errors);

        transmit({
          method: key,
          params: params
        }, cb);
      };
      return service;
    }, {});

    return services;
  }, {});
}

module.exports = RPCClient;