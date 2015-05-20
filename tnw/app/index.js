'use strict'

require('angular').module('app', [
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
.directive('appNav', require('./components/app-nav'))
.controller('AppController', ['$scope', AppController])

function AppController ($scope) {
  $scope.foo = 'Bar'
}