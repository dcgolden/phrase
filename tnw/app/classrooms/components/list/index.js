'use strict'

var fs = require('fs')

module.exports = {
  url: '/list',
  controller: ['$scope', 'classrooms', controller],
  template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
}

function controller ($scope, classrooms) {
  classrooms.list().then(function (res) {
    $scope.classrooms = res
  })
}