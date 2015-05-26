'use strict'

var fs = require('fs')

module.exports = {
  url: '/login',
  controller: ['$scope', 'users', '$state', '$rootScope', controller],
  template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
}

function controller ($scope, users, $state, $rootScope) {
  $scope.login = function (user) {
    users.login(user.username, user.password)
      .then(function (res) {
        $rootScope.$broadcast('users.login.success')
        $state.go('home')
      })
      .catch(function (err) {
        console.log(err)
      })
  }
}