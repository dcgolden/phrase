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
  	var article = {
  		content : "",
  		source  : "",
  		author  : "",
  		title   : ""
  	};
  	$scope.addArticle = function (data)
  	{
  		$http({
        method: 'POST',
        url: 'http://localhost:8080/api/articles',
        headers: 
        {
          'Content-Type': "application/x-www-form-urlencoded;charset=UTF8"
        },
        data: 
        {
          content : article.content,
          source  : article.source, 
          author  : article.author,
          title   : article.title, 
        }
    })
      console.log(data);
  	}
});
