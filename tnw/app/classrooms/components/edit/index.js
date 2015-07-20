'use strict'

var fs = require('fs')

module.exports = {
  url: '/:id/edit',
  controller: ['$scope', 'classrooms', '$state', '$stateParams', controller],
  template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
}

function controller ($scope, classrooms, $state, $stateParams ) {
  classrooms.get($stateParams.id) 
    .then(function (doc) {
      $scope.classroom = doc
    })

  $scope.update = function (classroom) {
    classrooms.update(classroom)
      .then(function (res) {
        $state.go('classrooms.show', { id: classroom._id})
      })
  }
}