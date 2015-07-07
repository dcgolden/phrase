'use strict';

var fs = require('fs');
module.exports = {
    url: '/pdf',
    controller: ['$scope', 'articles', 'classrooms', '$stateParams', '$state', controller],
    template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
};

function controller($scope, articles, $state) {

    /*classrooms.list().then(function(res) {
        $scope.$apply(function() {
            $scope.classrooms = res;
        });
    });*/
    $scope.create = function (article) {
    articles.create(article).then(function (res) {
      $state.go('articles.list');
    });
  };
}