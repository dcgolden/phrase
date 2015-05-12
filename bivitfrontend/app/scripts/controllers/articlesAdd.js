'use strict';
/**
 * @ngdoc function
 * @name bivitfrontSampleApp.controller:ArticlesAddCtrl
 * @description
 * # ArticlesAddCtrl
 * Controller of the bivitfrontSampleApp
 */
angular.module('bivitfrontSampleApp')
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
