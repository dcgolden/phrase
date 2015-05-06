'use strict';

/**
 * @ngdoc function
 * @name bivitfrontSampleApp.controller:ClassroomsClassroomidCtrl
 * @description
 * # ClassroomsClassroomidCtrl
 * Controller of the bivitfrontSampleApp
 */
angular.module('bivitfrontSampleApp')
  .controller('ClassroomsClassroomidCtrl', function ($scope, $http, $route, $routeParams) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var url = 'http://localhost:8080/api/classrooms/' + $routeParams.classroomId;

    $http.get(url)
    	.success( function (data) {
    		$scope.classroom = data;
    		console.log(data);
    	})
  });
