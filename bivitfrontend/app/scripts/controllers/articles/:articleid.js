'use strict';

/**
 * @ngdoc function
 * @name bivitfrontSampleApp.controller:ArticlesArticleidCtrl
 * @description
 * # ArticlesArticleidCtrl
 * Controller of the bivitfrontSampleApp
 */
angular.module('bivitfrontSampleApp')
    .controller('ArticlesArticleidCtrl', function($scope, $http, $routeParams, $mdDialog) {

        var url = 'http://localhost:8080/api/articles/' + $routeParams.articleId;
        var classroomURl = 'http://localhost:8080/api/classrooms/';

        $http.get(url)
            .success(function(data) {
                $scope.article = data;
                getClasroom();
                console.log(data);
            });

        var getClasroom = function () {
          $http.get(classroomURl + $scope.article.classroomID)
              .success(function (data) 
              {
                $scope.classroom = data;
                console.log(data);
              })
        };
        

        $scope.showConfirm = function(ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
              .parent(angular.element(document.body))
              .title('Would you like to delete this article?')
              .content('This will delete it forever.')
              .ariaLabel('Article Delete')
              .ok('Delete')
              .cancel('Cancel')
              .targetEvent(ev);
            $mdDialog.show(confirm).then(function() {
                $http.delete(url);
                console.log('deleted!');
                window.history.back();
            }, function() {
            });
        };
    });