'use strict'

var fs = require('fs')

module.exports = function (users) {
  return {
    restrict: 'E',
    controller: ['$scope', 'users', '$state', controller],
    template: fs.readFileSync(__dirname + '/template.html')
  }
}

function controller ($scope, users, $state, $mdSidenav, $log, $route, $stateParams) {
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

   $scope.$state = $state;
   $scope.$stateParams = $stateParams;


  function buildToggler(navID) {
    var debounceFn =  function(){
          $mdSidenav(navID).toggle()
            .then(function () {
              $log.debug('toggle ' + navID + ' is done');
            });
        }
    return debounceFn;
  }

      $scope.toggleLeft = buildToggler('left');

      $scope.close = function () {
    $mdSidenav('left').close()
      .then(function () {
        $log.debug('close LEFT is done');
      });
  };
}

    
