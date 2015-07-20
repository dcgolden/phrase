'use strict';

var fs = require('fs');
var $ = require('jquery');


module.exports = {
    url: '/:id',
    controller: ['$scope', 'articles', 'jquery', '$stateParams','$state', '$mdDialog', controller],
    template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
};

function controller($scope, articles, jQuery, $stateParams, $state, $mdDialog) {
    articles.get($stateParams.id).then(function(doc) {
        $scope.article = doc;
    });

    jQuery(function($) {
            var content = $('#content').annotator();
            content.annotator('addPlugin', 'Store', {
                // The endpoint of the store on your server.
                prefix: 'http://bivit-dev.iriscouch.com/annotator/_design/annotator/_rewrite',

                // Attach the uri of the current page to all annotations to allow search.
                annotationData: {
                    'uri': window.href
                },

                // This will perform a "search" action when the plugin loads. Will
                // request the last 20 annotations for the current url.
                // eg. /store/endpoint/search?limit=20&uri=http://this/document/only
                loadFromSearch: {
                    'limit': 20,
                    'uri': window.href
                }
            });
        });


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
