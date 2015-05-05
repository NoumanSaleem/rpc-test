'use strict';

function multiply() {
  var params = Array.prototype.slice.call(arguments);
  var cb = params.pop();
  var total = params.reduce(function (total, num) {
    return total * num;
  }, 1);

  cb(null, total);

}

module.exports = multiply;