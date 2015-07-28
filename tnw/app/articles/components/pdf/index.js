'use strict';
/*See /articles/new/index.js*/
var fs = require('fs');
module.exports = {
    url: '/pdf',
    controller: ['$scope', 'articles', 'classrooms', '$stateParams', '$state', controller],
    template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
};

function controller($scope, articles, classrooms, $stateParams, $state) {

    $scope.$emit('pushChangesToAllNodes', backButtonPlacer());

    function backButtonPlacer() {
        return { name: 'isArticlePageBool', data: true };
    }

    classrooms.list().then(function(classRes) {
        $scope.classrooms = classRes;
    });
    
    $scope.create = function (article) {
    articles.create(article).then(function (res) {
      $state.go('articles.list');
    });
  };
}