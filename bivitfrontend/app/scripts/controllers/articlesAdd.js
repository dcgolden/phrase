'use strict';

/**
 * @ngdoc function
 * @name bivitfrontSampleApp.controller:ArticlesAddCtrl
 * @description
 * # ArticlesAddCtrl
 * Controller of the bivitfrontSampleApp
 */
angular.module('bivitfrontSampleApp')
  .controller('ArticlesAddCtrl', function ($scope, $http) {

    //var theID = $scope.classroom._id;

  	$scope.addArticleCP = function (data)
  	{
  		$http({
        method: 'POST',
        url: 'http://localhost:8080/api/articles',
        headers: 
        {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: function(obj) {
        var str = [];
        for(var p in obj){
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        return str.join('&');
        }},
        data: {content: $scope.content, source: $scope.source, author: $scope.author, title: $scope.title, classroomID: $scope.classroom._id}
    });
      console.log(data);
  	};
    $scope.classrooms = [];
    
    $scope.loadClassrooms = function()
    {  
      $http.get('http://localhost:8080/api/classrooms')
      .success( function (data) {
        $scope.classrooms = (data);
        console.log(data);
      });
    };
});
