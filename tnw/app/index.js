'use strict'

window.PouchDB = require('pouchdb')
window.PouchDB.plugin(require('pouchdb-authentication'))

require('angular').module('app', [
  require('angular-animate'),
  require('angular-aria'),
  require('angular-material'),
  require('./ng-icons'),
  require('angular-ui-router'),
  require('./classrooms'),
  require('./articles'),
  require('./users')
])
.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/')
  $stateProvider
    .state('home', require('./components/home'))
    .state('about', require('./components/about'))
    .state('contact', require('./components/contact'))
}])
.directive('appNav', ['users', require('./components/app-nav')])
.controller('AppController', ['$scope', 'users', AppController])
.constant('dbName', 'https://bivit-dev.iriscouch.com/bivit')
.constant('remoteUserDbName', 'https://bivit-dev.iriscouch.com/_users')
//.factory('classrooms', ['pouchDb', require('./services/classrooms')])

function AppController ($scope, users, $mdThemingProvider, $mdSidenav, $mdUtil, $log) {
  $scope.showMenu = true
  $scope.toggle = function () {
    $scope.showMenu = !$scope.showMenu
  };

  $mdThemingProvider.theme('default')
    .primaryPalette('indigo', {
      'default': '500', // by default use shade 500 from the palette for primary intentions
      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '500', // use shade 500 for the <code>md-hue-2</code> class
      'hue-3': '700' // use shade 700 for the <code>md-hue-3</code> class
    })
    // If you specify less than all of the keys, it will inherit from the
    // default shades
    .accentPalette('light-blue', {
      'default': 'A200' // use shade A200 for default, and keep all other shades the same
    });

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

  $scope.close = function () {
    $mdSidenav('left').close()
      .then(function () {
        $log.debug('close LEFT is done');
      });
  };
}