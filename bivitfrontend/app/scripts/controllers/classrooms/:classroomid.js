'use strict';

/**
 * @ngdoc function
 * @name bivitfrontSampleApp.controller:ClassroomsClassroomidCtrl
 * @description
 * # ClassroomsClassroomidCtrl
 * Controller of the bivitfrontSampleApp
 */
angular.module('bivitfrontSampleApp')
    .controller('ClassroomsClassroomidCtrl', function($scope, $http, $route, $routeParams) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        var url = 'http://localhost:8080/api/classrooms/' + $routeParams.classroomId;
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
                })
            }
        };
    });