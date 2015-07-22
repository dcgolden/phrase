'use strict';

var fs = require('fs');
module.exports = {
    url: '/new/:classroom',
    controller: ['$scope', 'articles', 'classrooms', '$state', '$stateParams', controller],
    template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
};

function controller($scope, articles, classrooms, $state, $stateParams, controller) {

    $scope.$emit('pushChangesToAllNodes', backButtonPlacer());

    function backButtonPlacer() {
        return { name: 'isArticlePageBool', data: true };
    }

    classrooms.list().then(function(classRes) {
        $scope.classrooms = classRes;
    });
    
    $scope.article = {
        title: '',
        author: '',
        content: '',
        source: '',
        classroom: ''
    };
    $scope.article.classroom = $stateParams.classroom;
    console.log($scope.article.classroom);

    $scope.create = function(article) {
        articles.create(article).then(function(res) {
            $state.go('articles.list')
        });
    };
}
