'use strict';

/**
 * @ngdoc function
 * @name bivitfrontSampleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bivitfrontSampleApp
 */
angular.module('bivitfrontSampleApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.articlesPresent = function() {
    	
    };

    $http.get('http://localhost:8080/api/classrooms')
      .success( function (data) {
        $scope.classrooms = data;
        getClassroomArticles();
        console.log(data);
      });

    var j;

    var getClassroomArticles = function() {
	    for(j = 0; j < $scope.classrooms.length; j++) {
	        var url = 'http://localhost:8080/api/classrooms/' + $scope.classrooms[j]._id;
	        console.log($scope.classrooms[j]._id);
	        var articleUrl = 'http://localhost:8080/api/articles/';
	        var i;
	        $scope.articleObjects = [];
	        
	        $http.get(url)
	            .success(function(data) {
	                $scope.classroom = data;
	                getIndividualArticles();
	                console.log(articleUrl + $scope.classroom.articles[0]);
	            });
	        
	        var getIndividualArticles = function () {
	            for (i = 0; i < $scope.classroom.articles.length; i++) {  
	                $http.get(articleUrl + $scope.classroom.articles[i])
	                    .success(function (data) {
	                        $scope.articleObjects.push(data);
	                        console.log(data);
	                });
	            }
	        };
	    }
	};

  });
