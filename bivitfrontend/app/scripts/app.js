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
    'ngMaterial',
    'ngMdIcons'
  ])

  .controller('NavCtrl', function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $route, $routeParams, $location) {
    $scope.toggleLeft = buildToggler('left');

    /** grabs the current loaction
      */
 
     $scope.$route = $route;
     $scope.$location = $location;
     $scope.$routeParams = $routeParams;
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */

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

  })
  .controller('LeftNavCtrl', function ($scope, $timeout, $mdSidenav, $log, $location, $route, $routeParams) {
    
    /** grabs the current loaction
      */

     $scope.$route = $route;
     $scope.$location = $location;
     $scope.$routeParams = $routeParams;
     

    $scope.close = function () {
      $mdSidenav('left').close()
        .then(function () {
          $log.debug('close LEFT is done');
        });
    };

    $scope.navigateTo = function ( path ) {
      $location.path( path );
    };
  })

  .config(function ($routeProvider, $mdThemingProvider) {
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

    $mdThemingProvider.theme('default')
    .primaryPalette('indigo', {
      'default': '400', // by default use shade 400 from the pink palette for primary intentions
      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '500', // use shade 500 for the <code>md-hue-2</code> class
      'hue-3': '700' // use shade 700 for the <code>md-hue-3</code> class
    })
    // If you specify less than all of the keys, it will inherit from the
    // default shades
    .accentPalette('pink', {
      'default': 'A200' // use shade A200 for default, and keep all other shades the same
    });

    $routeProvider
      .when('/', {
        title: 'Home',
        icon: 'menu',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        title: 'About',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/contact', {
        title: 'Contact',
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
      .when('/users', {
        title: 'Users',
        icon: 'menu',
        templateUrl: 'views/users.html',
        controller: 'UsersCtrl',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .when('/classrooms', {
        title: 'Classrooms',
        icon: 'menu',
        templateUrl: 'views/classrooms.html',
        controller: 'ClassroomsCtrl',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .when('/users/:userId', {
        title: 'user.name',
        icon: 'navigate_before',
        templateUrl: 'views/users/:userid.html',
        controller: 'UsersUseridCtrl',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .when('/classrooms/:classroomId', {
        title: 'classroom.title',
        icon: 'navigate_before',
        templateUrl: 'views/classrooms/:classroomid.html',
        controller: 'ClassroomsClassroomidCtrl',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .when('/classroomsadd', {
        title: 'Add a Classroom',
        icon: 'navigate_before',
        templateUrl: 'views/classroomsAdd.html',
        controller: 'ClassroomsAddCtrl',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .when('/articles', {
	      title: 'Articles',   
        icon: 'menu',     
	      templateUrl: 'views/articles.html',
        controller: 'ArticlesCtrl',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .when('/articles/:articleId', {
        title: 'articles.title',
        icon: 'navigate_before',
        templateUrl: 'views/articles/:articleid.html',
        controller: 'ArticlesArticleidCtrl',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .when('/articlesadd', {
        title: 'Add an Article',
        icon: 'navigate_before',
        templateUrl: 'views/articlesAdd.html',
        controller: 'ArticlesAddCtrl',
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
