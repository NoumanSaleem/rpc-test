'use strict';

var _ = require('lodash');
var format = require('util').format;
var validator = require('is-my-json-valid');

function RPCClient(spec, transmit) {
  var services = Object.keys(spec).reduce(function (services, serviceName) {
    services[serviceName] = Object.keys(spec[serviceName]).reduce(function (service, method) {
      service[method] = function (params, cb) {
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

  return services;
}

module.exports = RPCClient;