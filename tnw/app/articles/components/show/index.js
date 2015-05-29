'use strict';

var fs = require('fs');

module.exports = {
    url: '/:id',
    controller: ['$scope', 'articles', '$stateParams', controller],
    template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
};

<<<<<<< HEAD
$('a').on('click', function() {
  $('.wrap, a').toggleClass('active');

  return false;
});

function controller ($scope, articles, $stateParams) {
  articles.get($stateParams.id).then(function(doc) {
    $scope.article = doc;
  });

  $scope.remove = function (id) {
    console.log($stateParams.id);
    articles.remove($stateParams.id).then(function (res) {
      $state.go('articles.list');
=======
function controller($scope, articles, $stateParams) {
    articles.get($stateParams.id).then(function(doc) {
        $scope.article = doc;
>>>>>>> origin/master
    });

    $scope.remove = function(id) {
        articles.remove(id).then(function(res) {
                $state.go('articles.list');
            }
        );
    };
}