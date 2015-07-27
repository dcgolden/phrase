'use strict';

var fs = require('fs');


module.exports = {
    url: '/:id',
    controller: ['$scope', 'articles', '$stateParams', '$state', '$http', '$mdDialog', controller],
    template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
};


function controller($scope, articles, $stateParams, $state, $http, $mdDialog) {
    articles.get($stateParams.id).then(function(doc) {
        $scope.article = doc;
    });
    $scope.$on('$viewContentLoaded', function() {
        var pageUri = function() {
            return {
                beforeAnnotationCreated: function(ann) {
                    ann.uri = window.location.href;
                }
            };
        };

        var app = new annotator.App()
            .include(annotator.ui.main, {
                //element: document.querySelector('#articleCardForAnnotation')
            })
            .include(annotator.storage.http, {
                prefix: 'http://173.255.227.92:5000'
            })
            .include(pageUri);

        app.start()
            .then(function() {
                setTimeout(function() {
                    app.annotations.load({
                        uri: window.location.href
                    });
                }, 300);
            });
    });
    $scope.$emit('pushChangesToAllNodes', backButtonPlacer());

    function backButtonPlacer() {
        return {
            name: 'isArticlePageBool',
            data: true
        };
    }

    var remove = function(id) {

        articles.remove(id).then(function(res) {
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
            .cancel('Cancel');
        $mdDialog.show(confirm).then(function() {
            remove(id);
            console.log('deleted!');
        }, function() {});
    };
}
