'use strict'
/*This section requires the node module fs to read the template html*/
var fs = require('fs')
/*This part exposes this module to rest of app*/
module.exports = {
  url: '/change-password',
  controller: ['$scope', 'users', '$state', controller],
  template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
}

function controller ($scope, users, $state) {
  /*back or menu button*/
  $scope.$emit('pushChangesToAllNodes', backButtonPlacer());

    function backButtonPlacer() {
        return { name: 'isArticlePageBool', data: false };
    }
  /*initalizes user to avoid undefined refs*/
  $scope.user = {}
  /*gets users session, exposes username only to scope*/
  users.getSession()
    .then(function (ctx) {
      $scope.user.username = ctx.username
    })
  /*interface with server to change password*/
  $scope.changePassword = function (user) {
    return users.changePassword(user.username, user.password)
  }
}