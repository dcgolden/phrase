'use strict'

var fs = require('fs')

module.exports = {
  url: '/show',
  controller: ['$scope', 'users', '$state', controller],
  template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
}

function controller ($scope, users, $state) {
  users.getSession()
    .then(function (ctx) {
      return ctx.username
    })
    .then(users.getUser)
    .then(function (user) {
      $scope.user = user
    })
}