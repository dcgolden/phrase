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

    var articleJSON = angular.toJson(article);

  	$scope.addArticle = function (data)
  	{
  		$http({
        method: 'POST',
        url: 'http://localhost:8080/api/articles',
        headers: 
        {
          'Content-Type': "application/x-www-form-urlencoded;charset=UTF8"
        },
        data: articleJSON
    })
      console.log(data);
  	}
});
