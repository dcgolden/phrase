'use strict';

/**
 * @ngdoc function
 * @name bivitfrontSampleApp.controller:UsersUseridCtrl
 * @description
 * # UsersUseridCtrl
 * Controller of the bivitfrontSampleApp
 */
angular.module('bivitfrontSampleApp')
  .controller('UsersUseridCtrl', function ($scope, $http, $route, $routeParams) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    var url = 'http://localhost:8080/api/users/' + $routeParams.userId;
    var classRL = 'http://localhost:8080/api/classrooms/';

    $http.get(url)
    	.success( function (data) {
        $scope.classroomIds = data.classroomIds;
    		$scope.user = data;
    		console.log(data);
    	})
/*
    $scope.getter = function(classr, function(classr) {
      $http.get(classRL+classr)
        .success( function(data) {
          $scope.classroom = data;
          console.log(classroom);
      })
    }) {
      console.log(classr);

    }

  */
  $scope.fetchClass = function(classr) {
    //console.log('HI' + classr);
    $http({method: 'GET', url: classRL+classr}).
        success(function(data, status) {

          $scope.status = status;
          $scope.classs = data || "weee";
          return data;
        }).
        error(function(data, status) {
          $scope.classs = data || "Request failed";
          $scope.status = status;
      });
  }  

  });
