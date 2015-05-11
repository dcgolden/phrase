'use strict';

/**
 * @ngdoc function
 * @name bivitfrontSampleApp.controller:ArticlesCtrl
 * @description
 * # ArticlesCtrl
 * Controller of the bivitfrontSampleApp
 */
angular.module('bivitfrontSampleApp')
  .controller('ArticlesCtrl', function ($scope, $http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $http.get('http://localhost:8080/api/articles')
    	.success( function (data) {
    		$scope.articles = data;
    		console.log(data);
    	});

     $scope.toggle = function() 
     {
      $http.delete(url);
     }; 
  });
