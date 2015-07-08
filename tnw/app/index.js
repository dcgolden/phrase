'use strict'

var cssify = require('cssify')

cssify.byUrl('//cdn.rawgit.com/angular/bower-material/master/angular-material.css')
cssify.byUrl('/main.css')


window.PouchDB = require('pouchdb')
window.PouchDB.plugin(require('pouchdb-authentication'))

require('angular').module('app', [
        require('angular-animate'),
        require('angular-aria'),
        require('angular-material'),
        require('./ng-icons'),
        require('angular-ui-router'),
        require('angular-messages'),
        require('./classrooms'),
        require('./articles'),
        require('./users')
    ])
    .config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider', function($stateProvider, $urlRouterProvider, $mdThemingProvider) {
        $urlRouterProvider.otherwise('/')
        $stateProvider
            .state('home', require('./components/home'))
            .state('about', require('./components/about'))
            .state('contact', require('./components/contact'))

        $mdThemingProvider.theme('default')
            .primaryPalette('indigo', {
                'default': '500', // by default use shade 500 from the palette for primary intentions
                'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
                'hue-2': '500', // use shade 500 for the <code>md-hue-2</code> class
                'hue-3': '700' // use shade 700 for the <code>md-hue-3</code> class
            })
            // If you specify less than all of the keys, it will inherit from the
            // default shades
            .accentPalette('pink', {
                'default': 'A200' // use shade A200 for default, and keep all other shades the same
            });

    }])
    .directive('appNav', ['users', require('./components/app-nav')])
    .controller('AppController', ['$scope', 'classrooms', 'users', AppController])
    .constant('dbName', 'https://bivit-dev.iriscouch.com/bivit')
    .constant('remoteUserDbName', 'https://bivit-dev.iriscouch.com/_users')
    .constant('annotationDbName', 'https://bivit-dev.iriscouch.com/annotator')
    //.factory('classrooms', ['pouchDb', require('./services/classrooms')])

function AppController($scope, users) {
    $scope.showMenu = true;
    $scope.toggle = function() {
        $scope.showMenu = !$scope.showMenu;
    }
}
