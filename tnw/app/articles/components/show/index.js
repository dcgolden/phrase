'use strict';

var fs = require('fs');

module.exports = {
  url: '/:id',
  controller: ['$scope', 'articles', '$stateParams', '$state', '$mdDialog', controller],
  template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
};

function controller ($scope, articles, $stateParams, $state, $mdDialog) {
  articles.get($stateParams.id).then(function(doc) {
    $scope.article = doc;
  });

  var remove = function (id) {
    
    articles.remove(id).then(function (res) {
      $state.go('articles.list');
    });
  };

  $scope.showConfirm = function(id) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
              .parent(angular.element(document.body))
              .title('Would you like to delete this article?')
              .content('This will delete it forever.')
              .ariaLabel('Article Delete')
              .ok('Delete')
              .cancel('Cancel')
            $mdDialog.show(confirm).then(function() {
                remove(id);
                console.log('deleted!');
            }, function() {
            });
        };
}