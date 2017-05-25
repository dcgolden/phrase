'use strict';
/*This section requires the node module fs to read the template html*/
var fs = require('fs');
/*This part exposes this module to rest of app*/
module.exports = {
    url: '/:id',
<<<<<<< HEAD
    controller: ['$scope', 'classrooms', 'articles', '$state', '$stateParams', controller],
    template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
};

function controller($scope, classrooms, articles, $state, $stateParams) {
=======
    controller: ['$scope', 'classrooms', 'users', '$state', '$stateParams', controller],
    template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
};

function controller($scope, classrooms, users, $state, $stateParams) {
>>>>>>> b229956916d1c3a5d597b2a7eced07c53d2e97b4
    /*back or menu button*/
    $scope.$emit('pushChangesToAllNodes', backButtonPlacer());

    function backButtonPlacer() { 
        return {
            name: 'isArticlePageBool', 
            data: true
        };
    }
    /*Gets classroom by id*/
    classrooms.get($stateParams.id)
        .then(function(doc) {
            $scope.classroom = doc;
        });
    /*Gets articles in this classroom*/
    articles.getArticles($stateParams.id)
        .then(function(res) {
            $scope.articles = res;
        });
    /*Allows us to pass the current classroom id to new article when you click add an article*/
    $scope.addAnArticle = function() {
        $state.go('articles.new', {
            classroom: $scope.classroom._id
        });
    };


    /*Lists all users*/
      users.list().then(function (res) {
         $scope.users = res
      })
      //steven did this
    $scope.goToArticle = function() {
        $state.go('articles.list');
    };

}
