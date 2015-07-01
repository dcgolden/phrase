'use strict';

var fs = require('fs');

module.exports = {
  url: '/:id/edit',
  controller: ['$scope', 'articles', '$stateParams', '$state', controller],
  template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
};

function controller ($scope, articles, $stateParams, $state) {

  articles.get($stateParams.id).then(function (doc) {
    $scope.article = doc;
  });

  $scope.update = function (article) {
    articles.update(article).then(function (res) {
      $state.go('articles.show', { id: article._id });
    });
  };
}