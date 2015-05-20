'use strict'

var fs = require('fs')

module.exports = {
  url: '/signup',
  controller: ['$scope', 'users', '$state', '$rootScope', controller],
  template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
}

function controller ($scope, users, $state, $rootScope) {
  $scope.signup = function (user) {
    users.signup(user.username, user.password, user.email)
      .then(function (res) {
        $state.go('users.login')
      })
  }
}