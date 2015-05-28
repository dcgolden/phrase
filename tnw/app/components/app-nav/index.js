'use strict'

var fs = require('fs')

module.exports = function (users) {
  return {
    restrict: 'E',
    controller: ['$scope', 'users', '$state', '$mdSidenav', '$mdUtil', '$log', controller],
    template: fs.readFileSync(__dirname + '/template.html')
  }
}

function controller ($scope, users, $state, $mdSidenav, $mdUtil, $log) {

  function buildToggler(navID) {
    var debounceFn =  $mdUtil.debounce(function(){
          $mdSidenav(navID)
            .toggle()
            .then(function () {
              $log.debug('toggle ' + navID + ' is done');
            });
        },300);

    return debounceFn;
  }

  $scope.toggleLeft = buildToggler('left');

  function getSession () {
    users.getSession()
    .then(function (o) {
      console.log(o.userCtx.name)
      $scope.$apply(function() {
        $scope.activeUser = o.userCtx.name  
      })
    })
    .catch(function(e) {
      $scope.$apply(function() {
        $scope.activeUser = null  
      })
    })
  }

  $scope.$on('users.login.success', getSession)

  getSession()
  
  $scope.logout = function () {
    users.logout().then(function() {
      $scope.$apply(function() {
        $scope.activeUser = null
        $state.go('home')
      })
    })
  }
}