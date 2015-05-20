'use strict'

var fs = require('fs')

module.exports = function () {
  return {
    restrict: 'E',
    controller: controller,
    template: fs.readFileSync(__dirname + '/template.html')
  }
}

function controller ($scope) {

}