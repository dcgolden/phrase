'use strict';

/**
 * @ngdoc function
 * @name bivitfrontSampleApp.controller:ArticlesArticleidCtrl
 * @description
 * # ArticlesArticleidCtrl
 * Controller of the bivitfrontSampleApp
 */
angular.module('bivitfrontSampleApp')
    .controller('ArticlesArticleidCtrl', function($scope, $http, $route, $routeParams, $mdDialog, $location) {

        var url = 'http://localhost:8080/api/articles/' + $routeParams.articleId;

        $http.get(url)
            .success(function(data) {
                $scope.article = data;
                console.log(data);
            });

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
                $location.path( '/articles' );
            }, function() {
            });
        };
    });