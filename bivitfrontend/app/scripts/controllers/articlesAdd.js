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
  		content : $scope.content,
  		source  : $scope.source,
  		author  : $scope.author,
  		title   : $scope.title
  	};


  	$scope.addArticle = function (data)
  	{
  		$http({
        method: 'POST',
        url: 'http://localhost:8080/api/articles',
        headers: 
        {
          'Content-Type': "application/x-www-form-urlencoded"
        },
        transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
        },
        data: {content: $scope.content, source: $scope.source, author: $scope.author, title: $scope.title}
    })
      console.log(data);
  	}
});
