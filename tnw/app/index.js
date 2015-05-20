'use strict'

window.PouchDB = require('pouchdb')

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
.constant('dbName', 'bivit')
//.factory('classrooms', ['pouchDb', require('./services/classrooms')])

function AppController ($scope) {
  $scope.foo = 'Bar'
}