'use strict'
/*This section requires the node module fs to read the template html*/
var fs = require('fs')
/*This part exposes this module to rest of app*/
module.exports = {
  url: '/signup',
  controller: ['$scope', 'users', '$state', '$stateParams', '$rootScope', controller],
  template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
}

function controller ($scope, users, $state, $stateParams, $rootScope) {
  $scope.signup = function (user) {
    users.signup(user.username, user.password, user.email)
      .then(function (res) {
        $state.go('users.login')
      })
  }
}