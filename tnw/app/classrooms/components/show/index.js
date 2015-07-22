'use strict';

var fs = require('fs');

module.exports = {
    url: '/:id',
    controller: ['$scope', 'classrooms', '$state', '$stateParams', controller],
    template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
};

function controller($scope, classrooms, $state, $stateParams) {

    $scope.$emit('pushChangesToAllNodes', backButtonPlacer());

        function backButtonPlacer() {
            return { name: 'isArticlePageBool', data: true };
        }

    classrooms.get($stateParams.id)
        .then(function(doc) {
            $scope.classroom = doc;
        });

    classrooms.getArticles($stateParams.id)
        .then(function(res) {
            $scope.articles = res;
        });

    $scope.addAnArticle = function() {
        $state.go('articles.new', {
            classroom: $scope.classroom._id
        });
    };
}
