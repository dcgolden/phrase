'use strict'
/*This section requires the node module fs to read the template html*/
var fs = require('fs')
/*This part exposes this module to rest of app*/
module.exports = {
  url: '/show',
  controller: ['$scope', 'users', '$state', controller],
  template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
}

function controller ($scope, users, $state, $rootScope) {
  /*back or menu button*/
  $scope.$emit('pushChangesToAllNodes', backButtonPlacer());

    function backButtonPlacer() {
        return { name: 'isArticlePageBool', data: false };
    }
  /*Gets the user's information to display in profile*/
  // users.getSession()
  //   .then(function (ctx) {
  //     return ctx.username
  //   })
  //   .then(users.getUser)
  //   .then(function (user) {
  //     $scope.user = user
  //   })
    users.getSession()
    .then(function (o) {
      console.log(o.userCtx.name)
      $scope.$apply(function() {
        users.getUser(o.userCtx.name).then(function(res){
          $scope.user = res
        })
      })
    })
}

