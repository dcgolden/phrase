'use strict';

var fs = require('fs');
module.exports = {
    url: '/new/:classroom',
    controller: ['$scope', 'articles', 'classrooms', '$state', '$stateParams', controller],
    template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
};

function controller($scope, articles, classrooms, $state, $stateParams, controller) {
    /*Sets defualt assignment value to false*/
    $scope.assignment = false;
    /*Tells page if it should have back or menu button*/
    $scope.$emit('pushChangesToAllNodes', backButtonPlacer());

    function backButtonPlacer() {
        return { name: 'isArticlePageBool', data: true };
    }
    /*Lists all classrooms*/
    classrooms.list().then(function(classRes) {
        $scope.classrooms = classRes;
    });
    /*Initalizes Empty Article object to avoid undefined references*/
    $scope.article = {
        title: '',
        author: '',
        content: '',
        source: '',
        classroom: '',
        creator: ''
    };
    /*Preloads classroom selection from $stateParams if coming from a classroom page*/
    $scope.article.classroom = $stateParams.classroom;
    $scope.article.creator = $scope.activeUser;
    /*Creates and saves article to database*/
    $scope.create = function(article) {
        articles.create(article).then(function(res) {
            $state.go('articles.list')
        });
    };
}
