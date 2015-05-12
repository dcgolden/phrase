'use strict';

/**
 * @ngdoc function
 * @name bivitfrontSampleApp.controller:ArticlesArticleidCtrl
 * @description
 * # ArticlesArticleidCtrl
 * Controller of the bivitfrontSampleApp
 */
angular.module('bivitfrontSampleApp')
  .controller('ArticlesArticleidCtrl', function ($scope, $http, $route, $routeParams, $mdDialog) {
  	var url = 'http://localhost:8080/api/articles/' + $routeParams.articleId;

  	$http.get(url)
    	.success( function (data) {
    		$scope.article = data;
    		console.log(data);
    	})
   		
      $scope.showConfirm = function(ev) {
       var confirm = $mdDialog.confirm()
        .title("Are you sure you want to delete this article and all of it's discussions")
        .content('This operation is non-reversible')
        .ariaLabel('Lucky day')
        .ok('Delete')
        .cancel('Take me back!')
        .targetEvent(ev);
    $mdDialog.show(confirm).then(function() {
      $scope.deleteArticle = function (data) {
        $http.delete(url);
        console.log(data);
      }
    }, 
    function() {
      
    });
  }
});

