'use strict';

/**
 * @ngdoc function
 * @name bivitfrontSampleApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the bivitfrontSampleApp
 */
angular.module('bivitfrontSampleApp')
  .controller('UsersCtrl', function ($scope, $http) {
  	$http.get('http://localhost:8080/api/users')
  		.success(function (data) {
  			$scope.users = data;
  			console.log(data);
  		});

  });
