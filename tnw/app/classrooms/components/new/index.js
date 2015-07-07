'use strict'

var fs = require('fs')

module.exports = {
  url: '/new',
  controller: ['$scope', 'classrooms', '$state', controller],
  template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
}

function controller ($scope, classrooms, $state) {
	var self = this;
    self.tags = [];

  $scope.create = function (classroom) {
    classrooms.create(classroom)
      .then(function (res) {
        $state.go('classrooms.list')
      })
  }
}
