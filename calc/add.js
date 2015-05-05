'use strict';

function add() {
  var params = Array.prototype.slice.call(arguments);
  var cb = params.pop();
  var total = params.reduce(function (total, num) {
    return total + num;
  }, 0);

  cb(null, total);

}

module.exports = add;