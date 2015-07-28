'use strict'
/*This section requires the node module fs to read the template html*/
var fs = require('fs')
/*This part exposes this module to rest of app*/
module.exports = {
  url: '/login',
  controller: ['$scope', 'users', '$state', '$rootScope', controller],
  template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
}
/*Logs in user to database and broadcasts the success to other controllers*/
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