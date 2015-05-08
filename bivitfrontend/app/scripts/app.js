'use strict';

/**
 * @ngdoc overview
 * @name bivitfrontSampleApp
 * @description
 * # bivitfrontSampleApp
 *
 * Main module of the application.
 */
angular
  .module('bivitfrontSampleApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial'
  ])

  .config(function ($routeProvider) {
    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
      // Initialize a new promise
      var deferred = $q.defer();

      //Make an AJAX call to see if user is logged in
      $http.get('/loggedin').success(function(user) {
        if(user !== '0') {
          $timeout(deferred.resolve, 0);
        }
        else {
          $rootScope.message = 'You need to log in.';
          $timeout(function(){deferred.reject();}, 0);
          $location.url('/login');
        }
      });
    };


    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
      .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UsersCtrl',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .when('/classrooms', {
        templateUrl: 'views/classrooms.html',
        controller: 'ClassroomsCtrl',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .when('/users/:userId', {
        templateUrl: 'views/users/:userid.html',
        controller: 'UsersUseridCtrl',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .when('/classrooms/:classroomId', {
        templateUrl: 'views/classrooms/:classroomid.html',
        controller: 'ClassroomsClassroomidCtrl',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .when('/articles', {
        templateUrl: 'views/articles.html',
        controller: 'ArticlesCtrl',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .when('/articles/:articleId', {
        templateUrl: 'views/articles/:articleid.html',
        controller: 'ArticlesArticleidCtrl',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: 'views/404.html'
      });
  });
