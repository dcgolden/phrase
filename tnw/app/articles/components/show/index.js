'use strict';

var fs = require('fs');


module.exports = {
    url: '/:id',
    controller: ['$scope', 'articles', '$stateParams', '$state', '$mdDialog', controller],
    template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
};


function controller($scope, articles, $stateParams, $state, $mdDialog) {
    articles.get($stateParams.id).then(function(doc) {
        $scope.article = doc;
    });


    $scope.$emit('pushChangesToAllNodes', backButtonPlacer());

    function backButtonPlacer() {
        return { name: 'isArticlePageBool', data: true };
    }

    var remove = function(id) {

        articles.remove(id).then(function(res) {
            $state.go('articles.list');
        });
    };

    articles.getAnnotations()
        .then(function(res) {
            $scope.annoations = res;
            console.log(res);
        });
    $scope.showConfirm = function(id) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .parent(angular.element(document.body))
            .title('Would you like to delete this article?')
            .content('This will delete it forever.')
            .ariaLabel('Article Delete')
            .ok('Delete')
            .cancel('Cancel');
        $mdDialog.show(confirm).then(function() {
            remove(id);
            console.log('deleted!');
        }, function() {});
    };
}
