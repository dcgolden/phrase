'use strict'

var fs = require('fs')

module.exports = {
  url: '/:id/edit',
  controller: ['$scope', controller],
  template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
}

function controller ($scope) {

}