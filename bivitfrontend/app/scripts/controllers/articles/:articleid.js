'use strict';

/**
 * @ngdoc function
 * @name bivitfrontSampleApp.controller:ArticlesArticleidCtrl
 * @description
 * # ArticlesArticleidCtrl
 * Controller of the bivitfrontSampleApp
 */
angular.module('bivitfrontSampleApp')
  .controller('ArticlesArticleidCtrl', function ($scope, $http, $route, $routeParams) {
  	var url = 'http://localhost:8080/api/articles/' + $routeParams.articleId;

  	$http.get(url)
    	.success( function (data) {
    		$scope.article = data;
    		console.log(data);
    	})

    /*DeleteArticlePressed = false;
    DeleteArticle = function (DeleteArticlePressed){
    	http.delete(url);
    	console.log(data);
    })*/
  });
