'use strict';

/**
 * @ngdoc function
 * @name bivitfrontSampleApp.controller:ClassroomsCtrl
 * @description
 * # ClassroomsCtrl
 * Controller of the bivitfrontSampleApp
 */
angular.module('bivitfrontSampleApp')
  .controller('ClassroomsCtrl', function ($scope, $http) {
    /*$scope.classrooms = [
      'English',
      'Math',
      'Science',
      'Spanish'
    ];*/

    $http.get('http://localhost:8080/api/classrooms')
    	.success( function (data) {
    		$scope.classrooms = data;
    		console.log(data);
    	});
  });
