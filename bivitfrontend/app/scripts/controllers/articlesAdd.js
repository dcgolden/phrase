'use strict';
/**
 * @ngdoc function
 * @name bivitfrontSampleApp.controller:ArticlesAddCtrl
 * @description
 * # ArticlesAddCtrl
 * Controller of the bivitfrontSampleApp
 */
angular.module('bivitfrontSampleApp')
<<<<<<< HEAD
  .controller('ArticlesAddCtrl', function ($scope, $http, $route, $routeParams) {
  	var headers = {
  		'Content-Type': 'application/x-www-form-urlencoded'
	};
	var options = 
	{
		host: 'http://localhost',
		port: '8080',
		path: '/api/articles',
		method: 'POST',
		headers: headers
	};
=======
  .controller('ArticlesAddCtrl', function ($scope, $http. $route, $routeParams) {
    var article = {};
    $scope.addArticle = function(){
    	$http.post(http://localhost:8080/api/articlces, );
    }
});
>>>>>>> parent of 696f4c9... articleAddFix

	var article = {
		content: "$scope.submissionContent", 
		source:"$scope.submissionSource", 
		author:"$scope.submissionAuthor", 
		title:"$scope.submissionTitle"};

	var request = $http.request(options, article);
  	
  	$scope.addArticle = function (data)
  	{
  		request();
  	}
});
