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

  	$scope.addArticleCP = function ()
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
        for(var p in obj)
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        return str.join('&');
        },
        data: {content: $scope.content, source: $scope.source, author: $scope.author, title: $scope.title, classroomID: $scope.classroom._id}
    })
      .success(function (data) {
        console.log(data);
        $http({
        method: 'PUT',
        url: 'http://localhost:8080/api/classrooms/' + $scope.classroom._id + '/articles',
        headers: 
        {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        return str.join('&');
        },
        data: {articles: data}
        })
         .success (function (data2) {
            console.log(data2);
         })
        window.history.back();
      }); 	
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
