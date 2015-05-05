'use strict';

var spec = {
  Greeter: {
    sayHello: require('./greeter/sayHello.spec.json')
  },
  Calc: {
    add: require('./calc/add.spec.json'),
    multiply: require('./calc/multiply.spec.json'),
  }
};

module.exports = spec;