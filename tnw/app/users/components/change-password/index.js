'use strict'

var fs = require('fs')

module.exports = {
  url: '/change-password',
  controller: ['$scope', 'users', '$state', controller],
  template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
}

function controller ($scope, users, $state) {
  $scope.user = {}
  users.getSession()
    .then(function (ctx) {
      $scope.user.username = ctx.username
    })
  
  $scope.changePassword = function (user) {
    return users.changePassword(user.username, user.password)
  }
}