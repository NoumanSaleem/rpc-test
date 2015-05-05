'use strict';

function sayHello(obj, cb) {
  cb(null, 'Hello, ' + obj.name);
}

module.exports = sayHello;